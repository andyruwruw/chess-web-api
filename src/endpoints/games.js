const WebApiRequest = require('../request/webapi-request.js');
const HttpManager = require('../request/http-manager.js');
const WebApiError = require('../request/webapi-error');
const { sortParameters } = require('../utils/sort-parameters');
const { Chess } = require('chess.js');

const BOARD_POSITIONS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?';
const BOARD_FILES = 'abcdefgh';
const BOARD_LENGTH = 8;
const UNDOCUMENTED_API_HOST = 'chess.com';
const ERR_MISSING_OR_EMPTY = 'Result missing or empty.';

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
  
  // signature of the callback function:
  // callback([error]: WebApiError, [result]: {body, headers, statusCode})
  if (_callback) {
    HttpManager.get(apiRequest, (error, result) => {
      if (error) {
        _callback(error);
      } else if (!result || !result.hasOwnProperty('body')) {
        _callback(new WebApiError(ERR_MISSING_OR_EMPTY));
      } else {
        try {
          _modifyResultBody(result.body);
        } catch (e) {
          error = new WebApiError(e.message);
        }

        if (error) {
          _callback(error)
        } else {
          _callback(null, result);
        }
      }
    });
    return null;
  }

  return new Promise(((resolve, reject) => {
    HttpManager.get(apiRequest, (error, result) => {
      if (error) {
        reject(error);
      } else if (!result || !result.hasOwnProperty('body')) {
        reject(new WebApiError(ERR_MISSING_OR_EMPTY));
      } else {
        try {
          _modifyResultBody(result.body);
        } catch (e) {
          error = new WebApiError(e.message);
        }

        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    });
  }));
}

/*
  Add the `game.pgn` field to the API results body.
  Required fields: `game.moveList`, `game.pgnHeaders`
*/
function _modifyResultBody(resultBody) {
  const game = _getRequiredProperty(resultBody, 'game');
  const moveList = _getRequiredProperty(game, 'moveList', 'game.moveList');
  const pgnHeaders = _getRequiredProperty(game, 'pgnHeaders', 'game.pgnHeaders');
  game.pgn = _getPGN(pgnHeaders, moveList);
}

/* Generate a PGN string using chess.js */
function _getPGN(pgnHeaders, moveList) {
  const moveListLength = moveList.length;
  if (moveListLength === 0 || moveListLength % 2 !== 0) {
    throw new Error('Malformed field "game.moveList"; ' + 
        `expected non-empty, even-number of characters: ${moveList}`);
  }
  const chess = pgnHeaders.hasOwnProperty('FEN') ?
      new Chess(pgnHeaders.FEN) :
      new Chess();
  for (const [key, value] of Object.entries(pgnHeaders)) {
    chess.header(key, value);
  }
  for (let i = 0; i < moveListLength; i += 2) {
    let encFrom = moveList[i];
    let encTo = moveList[i + 1];
    chess.move({
      'from': _decodeMove(encFrom),
      'to': _decodeMove(encTo)
    });
  }
  return chess.pgn();
}

/* Decode a move-character into algebraic notation */
function _decodeMove(encMove) {
  const index = BOARD_POSITIONS.indexOf(encMove);
  if (index === -1) {
    throw new Error(`Unrecognized move-character: ${encMove}`);
  }
  const file = BOARD_FILES[index % BOARD_LENGTH];
  const rank = Math.floor(index / BOARD_LENGTH) + 1;
  return `${file}${rank}`;
}

/* Get an object property, throwing an Error if missing */
function _getRequiredProperty(obj, propName, fullName) {
  if (Object.prototype.hasOwnProperty.call(obj, propName)) {
    return obj[propName];
  }
  const fieldName = typeof fullName !== 'undefined' ? fullName : propName;
  throw new Error(`Missing required field "${fieldName}"`);
}

module.exports = {
  getGameByID
};
