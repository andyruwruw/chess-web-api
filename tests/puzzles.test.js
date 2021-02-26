/* eslint-disable no-undef */
const {
  getDailyPuzzle,
  getDailyPuzzleRandom,
} = require('../src/endpoints/puzzles');

describe('Endpoints: Puzzles', () => {
  describe('getDailyPuzzle', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(5);
        const data = await getDailyPuzzle();

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('title');
        expect(data.body).toHaveProperty('url');
        expect(data.body).toHaveProperty('fen');
        expect(data.body).toHaveProperty('pgn');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getDailyPuzzleRandom', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(5);
        const data = await getDailyPuzzleRandom();

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('title');
        expect(data.body).toHaveProperty('url');
        expect(data.body).toHaveProperty('fen');
        expect(data.body).toHaveProperty('pgn');
      } catch (error) {
        console.log(error);
      }
    });
  });
});
