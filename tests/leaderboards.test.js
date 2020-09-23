/* eslint-disable no-undef */
const {
  getLeaderboards,
} = require('../src/endpoints/leaderboards');

/**
 * Leaderboards test is unstable, possibly a problem with the API
 * Works most of the time, but occassionally gives 404
 * Give time and rerun test
 */
it('Endpoint: getLeaderboards', async () => {
  expect.assertions(3);
  const data = await getLeaderboards();

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('daily');
  expect(data.body.daily).toBeInstanceOf(Array);
});
