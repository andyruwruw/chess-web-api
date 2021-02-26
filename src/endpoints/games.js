const { Chess } = require('chess.js');

const WebApiRequest = require('../request/webapi-request.js');
const HttpManager = require('../request/http-manager.js');
const WebApiError = require('../request/webapi-error');
const { sortParameters } = require('../utils/sort-parameters');

// see: https://github.com/andyruwruw/chess-web-api/issues/10#issuecomment-779735204
const BOARD_POSITIONS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?';
const BOARD_FILES = 'abcdefgh';
const BOARD_LENGTH = 8;

// see: https://github.com/andyruwruw/chess-web-api/issues/11#issuecomment-783687021
const PROMOTION_TABLE = '#@$_[]^()~{}';
const PROMOTION_TABLE_ROWS = 'brnq';
const PROMOTION_TABLE_ROWS_LENGTH = 4;
const PROMOTION_TABLE_COLUMNS_LENGTH = 3;
const PROMOTION_CAPTURE_LEFT = 1;
const PROMOTION_CAPTURE_RIGHT = 2;

const UNDOCUMENTED_API_HOST = 'chess.com';
const ERR_MISSING_OR_EMPTY = 'Result missing or empty.';

/**
 * _PawnPromotion constructor
 *
 * @param {*} index
 */
function _PawnPromotion(index) {
  const pieceIndex = Math.floor(index / PROMOTION_TABLE_COLUMNS_LENGTH);
  if (pieceIndex > PROMOTION_TABLE_ROWS_LENGTH - 1) {
    // this can only happen if the const table values are wrong
    throw new Error(`Pawn promotion row index out of bounds: ${pieceIndex}`);
  }
  this.piece = PROMOTION_TABLE_ROWS[pieceIndex];
  this.isCaptureLeft = index % PROMOTION_TABLE_COLUMNS_LENGTH
      === PROMOTION_CAPTURE_LEFT;
  this.isCaptureRight = index % PROMOTION_TABLE_COLUMNS_LENGTH
      === PROMOTION_CAPTURE_RIGHT;
}

/**
 * Calculate the destination square of a pawn promotion
 *
 * @param {*} from
 */
_PawnPromotion.prototype.getTo = function (from) {
  const fromFile = from[0];
  const fromRank = from[1];
  const fromFileIndex = BOARD_FILES.indexOf(fromFile);

  let toFileIndex;
  if (this.isCaptureLeft) {
    toFileIndex = fromFileIndex - 1;
  } else {
    toFileIndex = this.isCaptureRight
      ? fromFileIndex + 1
      : fromFileIndex;
  }

  // sanity check: ensure pawn is still on the board after promotion
  if (toFileIndex < 0 || toFileIndex > BOARD_LENGTH - 1) {
    throw new Error(`Invalid pawn promotion; file index out of bounds: ${toFileIndex}`);
  }
  const toFile = BOARD_FILES[toFileIndex];

  // sanity check: ensure pawn rank is 2 or 7 prior to promotion
  let toRank;
  if (fromRank === '2') {
    toRank = '1';
  } else if (fromRank === '7') {
    toRank = '8';
  } else {
    throw new Error(`Invalid rank prior to pawn promotion: ${fromRank}`);
  }
  return `${toFile}${toRank}`;
};

/**
 * Decode a move-character into algebraic notation or pawn promotion
 *
 * @param {*} encMove
 * @param {*} isTo
 */
function _decodeMove(encMove, isTo) {
  const index = BOARD_POSITIONS.indexOf(encMove);
  if (index === -1) {
    // if this is the "to" field, check for pawn promotion
    if (isTo) {
      const promotionIndex = PROMOTION_TABLE.indexOf(encMove);
      if (promotionIndex !== -1) {
        return new _PawnPromotion(promotionIndex);
      }
    }
    throw new Error(`Unrecognized move-character: ${encMove}`);
  }
  const file = BOARD_FILES[index % BOARD_LENGTH];
  const rank = Math.floor(index / BOARD_LENGTH) + 1;
  return `${file}${rank}`;
}

/**
 *  Generate a PGN string using chess.js
 */
function _getPGN(pgnHeaders, moveList) {
  const moveListLength = moveList.length;
  if (moveListLength === 0 || moveListLength % 2 !== 0) {
    throw new Error('Malformed field "game.moveList"; '
        + `expected non-empty, even-number of characters: ${moveList}`);
  }
  const chess = 'FEN' in pgnHeaders
    ? new Chess(pgnHeaders.FEN)
    : new Chess();

  Object.keys(pgnHeaders).forEach((key) => {
    chess.header(key, pgnHeaders[key]);
  });

  for (let i = 0; i < moveListLength; i += 2) {
    const move = {
      from: _decodeMove(moveList[i], false),
      to: _decodeMove(moveList[i + 1], true),
    };
    if (move.to instanceof _PawnPromotion) {
      move.promotion = move.to.piece;
      move.to = move.to.getTo(move.from);
    }
    chess.move(move);
  }
  return chess.pgn();
}

/**
 * Get an object property, throwing an Error if missing
 *
 * @param {*} obj
 * @param {*} propName
 * @param {*} fullName
 */
function _getRequiredProperty(obj, propName, fullName) {
  if (Object.prototype.hasOwnProperty.call(obj, propName)) {
    return obj[propName];
  }
  const fieldName = typeof fullName !== 'undefined' ? fullName : propName;
  throw new Error(`Missing required field "${fieldName}"`);
}

/**
 * Add the `game.pgn` field to the API results body.
 * Required fields: `game.moveList`, `game.pgnHeaders`
 *
 * @param {*} resultBody
 */
function _modifyResultBody(resultBody) {
  const game = _getRequiredProperty(resultBody, 'game');
  const moveList = _getRequiredProperty(game, 'moveList', 'game.moveList');
  const pgnHeaders = _getRequiredProperty(game, 'pgnHeaders', 'game.pgnHeaders');
  game.pgn = _getPGN(pgnHeaders, moveList);
}

/**
 * Lookup game by ID, generating a PGN on-the-fly
 *
 * @param {*} id
 * @param {*} options
 * @param {*} callback
 * @param {*} headers
 */
function getGameByID(id, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],

  );

  // construct the API request but do not execute it directly, as we need
  // to modify the result body
  const apiRequest = WebApiRequest.builder()
    .withHost(UNDOCUMENTED_API_HOST)
    .withPath(`/callback/live/game/${id}`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build();

  // properties of the result object: {body, headers, statusCode}
  if (_callback) {
    HttpManager.get(apiRequest, (error, result) => {
      if (error) {
        _callback(error);
      } else if (!result || !Object.prototype.hasOwnProperty.call(result, 'body')) {
        _callback(new WebApiError(ERR_MISSING_OR_EMPTY));
      } else {
        try {
          _modifyResultBody(result.body);
          _callback(null, result);
        } catch (e) {
          _callback(e);
        }
      }
    });
    return null;
  }

  return new Promise(((resolve, reject) => {
    HttpManager.get(apiRequest, (error, result) => {
      if (error) {
        reject(error);
      } else if (!result || !Object.prototype.hasOwnProperty.call(result, 'body')) {
        reject(new WebApiError(ERR_MISSING_OR_EMPTY));
      } else {
        try {
          _modifyResultBody(result.body);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      }
    });
  }));
}

module.exports = {
  getGameByID,
};
