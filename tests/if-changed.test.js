/* eslint-disable no-undef */
const ChessWebAPI = require('../src/index');

const URL_ID = 'chess-com-developer-community';

let chessAPI = null;

beforeAll(() => {
  chessAPI = new ChessWebAPI();
});

it('Function: ifChanged', async () => {
  expect.assertions(2);
  const data = await chessAPI.getClub(URL_ID);
  const eTag = data.headers.etag;

  const result = await chessAPI.ifChanged(
    eTag,
    chessAPI.getClub,
    [URL_ID],
  );

  expect(result).toHaveProperty('changed');
  expect(result).toHaveProperty('response');
});
