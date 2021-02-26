/* eslint-disable no-undef */
const ChessWebAPI = require('../src/index');

const URL_ID = 'chess-com-developer-community';

let chessAPI = null;

beforeAll(() => {
  chessAPI = new ChessWebAPI();
});

describe('Functionality: If Changed', () => {
  describe('ifChanged', () => {
    it('Unchanged', async () => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    });

    // If theres some value that is constantly changing?
  });
});
