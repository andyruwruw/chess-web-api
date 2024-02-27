/* eslint-disable no-undef */
const {
  getClub,
  getClubMembers,
  getClubMatches,
} = require('../src/endpoints/clubs');

const URL_ID = 'chess-com-developer-community';

describe('Endpoints: Clubs', () => {
  describe('getClub', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(5);
        const data = await getClub(URL_ID);

        expect(data.statusCode).toEqual(200);

        expect(data.body).toHaveProperty('club_id');
        expect(data.body).toHaveProperty('url');
        expect(data.body).toHaveProperty('name');
        expect(data.body).toHaveProperty('members_count');
      } catch (error) {
        console.log(error);
      }
    });

    it('Missing ID', async () => {
      try {
        expect.assertions(3);
        const data = await getClub();

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('name');
        expect(data.body.name).toEqual('undefined');
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getClubMembers', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(3);
        const data = await getClubMembers(URL_ID);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('weekly');
        expect(data.body.weekly).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });

    it('Missing ID', async () => {
      try {
        expect.assertions(3);
        const data = await getClubMembers();

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('weekly');
        expect(data.body.weekly).toEqual([]);
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe('getClubMatches', () => {
    it('Valid Request', async () => {
      try {
        expect.assertions(5);
        const data = await getClubMatches(URL_ID);

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('finished');
        expect(data.body).toHaveProperty('in_progress');
        expect(data.body).toHaveProperty('registered');
        expect(data.body.finished).toBeInstanceOf(Array);
      } catch (error) {
        console.log(error);
      }
    });

    it('Missing ID', async () => {
      try {
        expect.assertions(5);
        const data = await getClubMatches();

        expect(data.statusCode).toEqual(200);
        expect(data.body).toHaveProperty('finished');
        expect(data.body).toHaveProperty('in_progress');
        expect(data.body).toHaveProperty('registered');
        expect(data.body.finished).toEqual([]);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
