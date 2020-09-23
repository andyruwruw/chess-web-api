/* eslint-disable no-undef */
const {
  getPlayer,
  getPlayerStats,
  getPlayerOnline,
  getPlayerCurrentDailyChess,
  getPlayerToMoveDailyChess,
  getPlayerMonthlyArchives,
  getPlayerCompleteMonthlyArchives,
  getPlayerMultiGamePGN,
  getPlayerClubs,
  getPlayerMatches,
  getPlayerTournaments,
  getTitledPlayers,
} = require('../src/endpoints/player-data');

const USERNAME = 'andyruwruw';

it('Endpoint: getPlayer', async () => {
  expect.assertions(5);
  const data = await getPlayer(USERNAME);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('player_id');
  expect(data.body).toHaveProperty('url');
  expect(data.body).toHaveProperty('name');
  expect(data.body).toHaveProperty('username');
});

it('Endpoint: getPlayerStats', async () => {
  expect.assertions(4);
  const data = await getPlayerStats(USERNAME);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('chess_daily');
  expect(data.body).toHaveProperty('chess_rapid');
  expect(data.body).toHaveProperty('chess_blitz');
});

it('Endpoint: Endpoint: getPlayerOnline', async () => {
  expect.assertions(2);
  const data = await getPlayerOnline(USERNAME);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('online');
});

it('Endpoint: getPlayerCurrentDailyChess', async () => {
  expect.assertions(3);
  const data = await getPlayerCurrentDailyChess(USERNAME);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('games');
  expect(data.body.games).toBeInstanceOf(Array);
});

it('Endpoint: getPlayerToMoveDailyChess', async () => {
  expect.assertions(3);
  const data = await getPlayerToMoveDailyChess(USERNAME);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('games');
  expect(data.body.games).toBeInstanceOf(Array);
});

it('Endpoint: getPlayerMonthlyArchives', async () => {
  expect.assertions(3);
  const data = await getPlayerMonthlyArchives(USERNAME);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('archives');
  expect(data.body.archives).toBeInstanceOf(Array);
});

it('Endpoint: getPlayerCompleteMonthlyArchives', async () => {
  expect.assertions(3);
  const data = await getPlayerCompleteMonthlyArchives(USERNAME, 2020, 8);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('games');
  expect(data.body.games).toBeInstanceOf(Array);
});

it('Endpoint: getPlayerMultiGamePGN', async () => {
  expect.assertions(2);
  const data = await getPlayerMultiGamePGN(USERNAME, 2020, 8);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toBeInstanceOf(Buffer);
});

it('Endpoint: getPlayerClubs', async () => {
  expect.assertions(3);
  const data = await getPlayerClubs(USERNAME);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('clubs');
  expect(data.body.clubs).toBeInstanceOf(Array);
});

it('Endpoint: getPlayerMatches', async () => {
  expect.assertions(5);
  const data = await getPlayerMatches(USERNAME);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('finished');
  expect(data.body).toHaveProperty('in_progress');
  expect(data.body).toHaveProperty('registered');
  expect(data.body.finished).toBeInstanceOf(Array);
});

it('Endpoint: getPlayerTournaments', async () => {
  expect.assertions(5);
  const data = await getPlayerTournaments(USERNAME);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('finished');
  expect(data.body).toHaveProperty('in_progress');
  expect(data.body).toHaveProperty('registered');
  expect(data.body.finished).toBeInstanceOf(Array);
});

it('Endpoint: getTitledPlayers', async () => {
  expect.assertions(3);
  const data = await getTitledPlayers('GM');

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('players');
  expect(data.body.players).toBeInstanceOf(Array);
});
