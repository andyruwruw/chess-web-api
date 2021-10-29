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

describe('Endpoints: Player', () => {
  describe('getPlayer', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(5);
        const data = await getPlayer(USERNAME);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('player_id');
        expect(data.body).toHaveProperty('url');
        expect(data.body).toHaveProperty('name');
        expect(data.body).toHaveProperty('username');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getPlayerStats', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(4);
        const data = await getPlayerStats(USERNAME);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('chess_daily');
        expect(data.body).toHaveProperty('chess_rapid');
        expect(data.body).toHaveProperty('chess_blitz');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getPlayerOnline', () => {
    it('Valid Request', async () => {
      try {
        const data = await getPlayerOnline(USERNAME);
      } catch (error) {
        expect(error.message).toBe('This endpoint was removed by Chess.com, please see https://github.com/andyruwruw/chess-web-api/tree/master#getplayeronlineusername-options-callback');
      }
    });
  });

  describe('getPlayerCurrentDailyChess', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(3);
        const data = await getPlayerCurrentDailyChess(USERNAME);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('games');
        expect(data.body.games).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getPlayerToMoveDailyChess', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(3);
        const data = await getPlayerToMoveDailyChess(USERNAME);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('games');
        expect(data.body.games).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getPlayerMonthlyArchives', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(3);
        const data = await getPlayerMonthlyArchives(USERNAME);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('archives');
        expect(data.body.archives).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getPlayerCompleteMonthlyArchives', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(3);
        const data = await getPlayerCompleteMonthlyArchives(USERNAME, 2020, 8);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('games');
        expect(data.body.games).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getPlayerMultiGamePGN', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(2);
        const data = await getPlayerMultiGamePGN(USERNAME, 2020, 8);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toBeInstanceOf(Buffer);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getPlayerClubs', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(3);
        const data = await getPlayerClubs(USERNAME);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('clubs');
        expect(data.body.clubs).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getPlayerMatches', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(5);
        const data = await getPlayerMatches(USERNAME);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('finished');
        expect(data.body).toHaveProperty('in_progress');
        expect(data.body).toHaveProperty('registered');
        expect(data.body.finished).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getPlayerTournaments', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(5);
        const data = await getPlayerTournaments(USERNAME);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('finished');
        expect(data.body).toHaveProperty('in_progress');
        expect(data.body).toHaveProperty('registered');
        expect(data.body.finished).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getTitledPlayers', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(3);
        const data = await getTitledPlayers('GM');

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('players');
        expect(data.body.players).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
