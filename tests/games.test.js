/* eslint-disable no-undef */
const { getGameByID } = require('../src/endpoints/games');
const { Chess } = require('chess.js');
const each = require('jest-each').default;

// simple game
// API: https://www.chess.com/callback/live/game/6592985978
// WEB: https://www.chess.com/analysis/game/live/6592985978
const TEST_GAME_1 = [
  // id, startFen, endFen
  '6592985978',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'r3k3/2p5/1pn3rn/p6p/1P1bPB1q/P2N3P/N1Q1K3/5B2 w q - 2 24',
];

// long game
// API: https://www.chess.com/callback/live/game/6508402266
// WEB: https://www.chess.com/analysis/game/live/6508402266
const TEST_GAME_2 = [
  // id, startFen, endFen
  '6508402266',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'K1r5/p5kp/8/6PP/8/1r6/8/8 w - - 9 56',
];

// promotion to Knight
// API: https://www.chess.com/callback/live/game/7779158529
// WEB: https://www.chess.com/analysis/game/live/7779158529
const TEST_GAME_3 = [
  // id, startFen, endFen
  '7779158529',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'r1bq1Nnr/pp1pk2p/n1p3pb/4p3/P4P2/1P1P4/2P3PP/RNBQKBNR b KQ a3 0 9',
];

// promotion to Knight, capturing left
// API: https://www.chess.com/callback/live/game/7781476647
// WEB: https://www.chess.com/analysis/game/live/7781476647
const TEST_GAME_4 = [
  // id, startFen, endFen
  '7781476647',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'rnbN1rk1/1p3pbp/p1p3pn/4P3/1P1P4/8/P4PPP/RNBQKBNR b KQ - 0 9',
];

// promotion to Knight, capturing right
// API: https://www.chess.com/callback/live/game/7782722623
// WEB: https://www.chess.com/analysis/game/live/7782722623
const TEST_GAME_5 = [
  // id, startFen, endFen
  '7782722623',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'rnbNkb1r/pp1ppppp/7n/8/8/8/PPP1PPPP/RNBQKBNR b KQkq - 0 5',
];

// promotion to Queen
// API: https://www.chess.com/callback/live/game/7766570889
// WEB: https://www.chess.com/analysis/game/live/7766570889
const TEST_GAME_6 = [
  // id, startFen, endFen
  '7766570889',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'rnbQ1bnr/pp2pkpp/2p5/q4p2/8/5P2/PPPP2PP/RNBQKBNR b KQ - 0 6',
];

// promotion to Queen, capturing left
// API: https://www.chess.com/callback/live/game/7791144955
// WEB: https://www.chess.com/analysis/game/live/7791144955
const TEST_GAME_7 = [
  // id, startFen, endFen
  '7791144955',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'rnbqkbnr/p2ppppp/8/1p6/P7/8/2PPPPPP/qNBQKBNR w Kkq - 0 7',
];

// promotion to Queen, capturing right
// API: https://www.chess.com/callback/live/game/7783310939
// WEB: https://www.chess.com/analysis/game/live/7783310939
const TEST_GAME_8 = [
  // id, startFen, endFen
  '7783310939',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'rnbQkb1r/pp1ppppp/7n/8/8/8/PPP1PPPP/RNBQKBNR b KQkq - 0 5',
];

// promotion to Bishop `#`
// API: https://www.chess.com/callback/live/game/7766500765
// WEB: https://www.chess.com/analysis/game/live/7766500765
const TEST_GAME_9 = [
  // id, startFen, endFen
  '7766500765',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'rnbqkbnr/ppp1pppp/8/8/8/1QP5/PPKP1PPP/RNB1bBNR w kq - 0 6',
];

// promotion to Bishop, capturing left
// API: https://www.chess.com/callback/live/game/7782109487
// WEB: https://www.chess.com/analysis/game/live/7782109487
const TEST_GAME_10 = [
  // id, startFen, endFen
  '7782109487',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'rnbBkb1r/ppp2ppp/7n/3p4/4P3/8/PPP2PPP/RNBQKBNR b KQkq - 0 6',
];

// promotion to Bishop, capturing right
// API: https://www.chess.com/callback/live/game/7782766035
// WEB: https://www.chess.com/analysis/game/live/7782766035
const TEST_GAME_11 = [
  // id, startFen, endFen
  '7782766035',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'rnbBkb1r/pp1ppppp/7n/8/8/8/PPP1PPPP/RNBQKBNR b KQkq - 0 5',
];

// promotion to Rook
// API: https://www.chess.com/callback/live/game/7766621831
// WEB: https://www.chess.com/analysis/game/live/7766621831
const TEST_GAME_12 = [
  // id, startFen, endFen
  '7766621831',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'rnbqkbnr/ppp1pppp/8/7Q/5P2/3P4/PPPK2PP/RNB1rBNR w kq - 0 6',
];

// promotion to Rook, capturing left
// API: https://www.chess.com/callback/live/game/7782154707
// WEB: https://www.chess.com/analysis/game/live/7782154707
const TEST_GAME_13 = [
  // id, startFen, endFen
  '7782154707',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'rnbRkb1r/ppp2ppp/7n/3p4/2P5/8/PP2PPPP/RNBQKBNR b KQkq - 0 6',
];

// promotion to Rook, capturing right
// API: https://www.chess.com/callback/live/game/7783381153
// WEB: https://www.chess.com/analysis/game/live/7783381153
const TEST_GAME_14 = [
  // id, startFen, endFen
  '7783381153',
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  'rnbRkb1r/pp1ppppp/7n/8/8/8/PPP1PPPP/RNBQKBNR b KQkq - 0 5',
];

const ALL_TEST_GAMES = [
  TEST_GAME_1,
  TEST_GAME_2,
  TEST_GAME_3,
  TEST_GAME_4,
  TEST_GAME_5,
  TEST_GAME_6,
  TEST_GAME_7,
  TEST_GAME_8,
  TEST_GAME_9,
  TEST_GAME_10,
  TEST_GAME_11,
  TEST_GAME_12,
  TEST_GAME_13,
  TEST_GAME_14,
];

each(ALL_TEST_GAMES).it('Endpoint: getGameByID', async (id, startFen, endFen) => {
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
