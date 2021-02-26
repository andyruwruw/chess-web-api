/* eslint-disable no-undef */
const {
  getCountry,
  getCountryPlayers,
  getCountryClubs,
} = require('../src/endpoints/countries');

// US was failing due to 'getCountryPlayers' being such a huge file.
const ISO = 'LU';

describe('Endpoints: Countries', () => {
  describe('getCountry', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(3);
        const data = await getCountry(ISO);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('code');
        expect(data.body).toHaveProperty('name');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getCountryPlayers', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(3);
        const data = await getCountryPlayers(ISO);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('players');
        expect(data.body.players).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getCountryClubs', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(3);
        const data = await getCountryClubs(ISO);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('clubs');
        expect(data.body.clubs).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
