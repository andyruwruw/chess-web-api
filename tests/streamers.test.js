/* eslint-disable no-undef */
const {
  getStreamers,
} = require('../src/endpoints/streamers');

describe('Endpoints: Streamers', () => {
  describe('getStreamers', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(3);
        const data = await getStreamers();

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('streamers');
        expect(data.body.streamers).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
