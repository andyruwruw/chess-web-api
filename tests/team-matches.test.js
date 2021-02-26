/* eslint-disable no-undef */
const {
  getTeamMatch,
  getTeamMatchBoard,
  getTeamLiveMatch,
  getTeamLiveMatchBoard,
} = require('../src/endpoints/team-matches');

const ID = '12803';
const BOARD = '3';
const LIVE_ID = '5833';

describe('Endpoints: Team Matches', () => {
  describe('getTeamMatch', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(5);
        const data = await getTeamMatch(ID);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('name');
        expect(data.body).toHaveProperty('url');
        expect(data.body).toHaveProperty('status');
        expect(data.body).toHaveProperty('teams');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getTeamMatchBoard', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(4);
        const data = await getTeamMatchBoard(ID, BOARD);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('board_scores');
        expect(data.body).toHaveProperty('games');
        expect(data.body.games).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getTeamLiveMatch', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(5);
        const data = await getTeamLiveMatch(LIVE_ID);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('name');
        expect(data.body).toHaveProperty('url');
        expect(data.body).toHaveProperty('status');
        expect(data.body).toHaveProperty('teams');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getTeamLiveMatchBoard', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(4);
        const data = await getTeamLiveMatchBoard(LIVE_ID, BOARD);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('board_scores');
        expect(data.body).toHaveProperty('games');
        expect(data.body.games).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
