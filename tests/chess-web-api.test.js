/* eslint-disable no-undef */
const ChessWebAPI = require('../src/index');

const CLUB_ID = 'chess-com-developer-community';

describe('ChessWebAPI', () => {
  describe('Constructor', () => {
    it('creates instance without options', () => {
      expect.assertions(1);
      const api = new ChessWebAPI();
      expect(api).toBeInstanceOf(ChessWebAPI);
    });

    it('creates queue instance with { queue: true }', () => {
      expect.assertions(3);
      const api = new ChessWebAPI({ queue: true });
      expect(api).toBeInstanceOf(ChessWebAPI);
      expect(api).toHaveProperty('_requests');
      expect(api._requests).toBeInstanceOf(Array);
    });
  });

  describe('ifChanged', () => {
    let api;

    beforeAll(() => {
      api = new ChessWebAPI();
    });

    it('throws when etag is null', async () => {
      expect.assertions(1);
      await expect(api.ifChanged(null, () => {})).rejects.toThrow('etag required for ifChanged');
    });

    it('throws when etag is not a string', async () => {
      expect.assertions(1);
      await expect(api.ifChanged(123, () => {})).rejects.toThrow('etag required for ifChanged');
    });

    it('throws when method is null', async () => {
      expect.assertions(1);
      await expect(api.ifChanged('some-etag', null)).rejects.toThrow('dispatch requires request function');
    });

    it('throws when method is not a function', async () => {
      expect.assertions(1);
      await expect(api.ifChanged('some-etag', 'not-a-function')).rejects.toThrow('dispatch requires request function');
    });

    it('returns { changed: false } when method rejects', async () => {
      expect.assertions(1);
      const failingMethod = () => Promise.reject(new Error('forced failure'));
      const result = await api.ifChanged('some-etag', failingMethod, []);
      expect(result).toEqual({ changed: false });
    });

    it('returns changed: true with response on stale etag', async () => {
      try {
        expect.assertions(2);
        const result = await api.ifChanged('stale-nonexistent-etag', api.getClub, [CLUB_ID]);
        expect(result).toHaveProperty('changed', true);
        expect(result).toHaveProperty('response');
      } catch (error) {
        console.log(error);
      }
    });

    it('accepts object as options parameter', async () => {
      try {
        expect.assertions(1);
        const result = await api.ifChanged('stale-etag', api.getClub, [CLUB_ID], {});
        expect(result).toHaveProperty('changed');
      } catch (error) {
        console.log(error);
      }
    });

    it('accepts function as callback parameter', async () => {
      try {
        expect.assertions(1);
        const result = await api.ifChanged('stale-etag', api.getClub, [CLUB_ID], null, () => {});
        expect(result).toHaveProperty('changed');
      } catch (error) {
        console.log(error);
      }
    });
  });
});
