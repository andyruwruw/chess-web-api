/* eslint-disable no-undef */
const {
  getStreamers,
} = require('../src/endpoints/streamers');

it('Endpoint: getStreamers', async () => {
  expect.assertions(3);
  const data = await getStreamers();

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('streamers');
  expect(data.body.streamers).toBeInstanceOf(Array);
});
