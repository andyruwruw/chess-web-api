/* eslint-disable no-undef */
const {
  getTournament,
  getTournamentRound,
  getTournamentRoundGroup,
} = require('../src/endpoints/tournaments');

const URL_ID = '-33rd-chesscom-quick-knockouts-1401-1600';
const ROUND = '1';
const GROUP = '1';

describe('Endpoints: Tournaments', () => {
  describe('getTournament', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(6);
        const data = await getTournament(URL_ID);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('name');
        expect(data.body).toHaveProperty('url');
        expect(data.body).toHaveProperty('status');
        expect(data.body).toHaveProperty('players');
        expect(data.body.players).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getTournament', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(5);
        const data = await getTournamentRound(URL_ID, ROUND);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('groups');
        expect(data.body.groups).toBeInstanceOf(Array);
        expect(data.body).toHaveProperty('players');
        expect(data.body.players).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getTournament', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(6);
        const data = await getTournamentRoundGroup(URL_ID, ROUND, GROUP);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('fair_play_removals');
        expect(data.body).toHaveProperty('games');
        expect(data.body.games).toBeInstanceOf(Array);
        expect(data.body).toHaveProperty('players');
        expect(data.body.players).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
