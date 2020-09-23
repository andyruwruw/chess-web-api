/* eslint-disable no-undef */
const {
  getClub,
  getClubMembers,
  getClubMatches,
} = require('../src/endpoints/clubs');

const URL_ID = 'chess-com-developer-community';

it('Endpoint: getClub', async () => {
  expect.assertions(5);
  const data = await getClub(URL_ID);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('club_id');
  expect(data.body).toHaveProperty('url');
  expect(data.body).toHaveProperty('name');
  expect(data.body).toHaveProperty('members_count');
});

it('Endpoint: getClubMembers', async () => {
  expect.assertions(3);
  const data = await getClubMembers(URL_ID);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('weekly');
  expect(data.body.weekly).toBeInstanceOf(Array);
});

it('Endpoint: getClubMatches', async () => {
  expect.assertions(5);
  const data = await getClubMatches(URL_ID);

  expect(data.statusCode).toEqual(200);
  expect(data.body).toHaveProperty('finished');
  expect(data.body).toHaveProperty('in_progress');
  expect(data.body).toHaveProperty('registered');
  expect(data.body.finished).toBeInstanceOf(Array);
});
