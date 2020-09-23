/* eslint-disable no-undef */
const {
  getCountry,
  getCountryPlayers,
  getCountryClubs,
} = require('../src/endpoints/countries');

const ISO = 'US';

it('Endpoint: getCountry', async () => {
  expect.assertions(3);
  const data = await getCountry(ISO);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('code');
  expect(data.body).toHaveProperty('name');
});

it('Endpoint: getCountryPlayers', async () => {
  expect.assertions(3);
  const data = await getCountryPlayers(ISO);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('players');
  expect(data.body.players).toBeInstanceOf(Array);
});

it('Endpoint: getCountryClubs', async () => {
  expect.assertions(3);
  const data = await getCountryClubs(ISO);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('clubs');
  expect(data.body.clubs).toBeInstanceOf(Array);
});
