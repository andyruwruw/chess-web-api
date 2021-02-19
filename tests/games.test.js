/* eslint-disable no-undef */
const { getGameByID } = require('../src/endpoints/games');
const { Chess } = require('chess.js');
const each = require("jest-each").default;

/*
  NOTE: 
  Works for test game #1, but test game #2 fails due to pawn promotion.
  Since the API endpoint doesn't tell us which unit the pawn is promoted to, 
  (the move is simply represented by an underscore), we cannot give the
  chess.js engine enough information to produce a standard PGN.
*/

// API: https://www.chess.com/callback/live/game/6592985978
// WEB: https://www.chess.com/analysis/game/live/6592985978
const TEST_GAME_1 = [
  // id, startFen, endFen
  '6592985978',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'r3k3/2p5/1pn3rn/p6p/1P1bPB1q/P2N3P/N1Q1K3/5B2 w q - 2 24'
]

// API: https://www.chess.com/callback/live/game/6508402266
// WEB: https://www.chess.com/analysis/game/live/6508402266
const TEST_GAME_2 = [
  // id, startFen, endFen
  '6508402266',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'K1r5/p5kp/8/6PP/8/1r6/8/8 w - - 9 56'
]

each([TEST_GAME_1, TEST_GAME_2]).it('Endpoint: getGameByID', 
    async (id, startFen, endFen) => {
  expect.assertions(6);
  const data = await getGameByID(id);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('game');
  expect(data.body).toHaveProperty('game.moveList');
  expect(data.body).toHaveProperty('game.pgnHeaders');
  expect(data.body).toHaveProperty('game.pgn');

  // verify that PGN results in the expected FEN per the game analysis page
  const chess = new Chess(startFen);
  chess.load_pgn(data.body.game.pgn);
  expect(chess.fen()).toEqual(endFen);
});
