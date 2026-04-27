/* eslint-disable no-undef */
const HttpManager = require('../src/request/http-manager');
const WebapiError = require('../src/request/webapi-error');

jest.setTimeout(15000);

const makeMockRequest = (overrides = {}) => ({
  getQueryParameters: () => overrides.queryParams || null,
  getBodyParameters: () => overrides.bodyParams || null,
  getHeaders: () => overrides.headers || null,
  getURI: () => overrides.uri || 'https://api.chess.com/pub/player/andyruwruw',
});

describe('HttpManager', () => {
  describe('GET', () => {
    it('executes with query parameters', (done) => {
      const req = makeMockRequest({ queryParams: { format: 'json' } });
      HttpManager.get(req, () => done());
    });
  });

  describe('POST', () => {
    it('executes without body', (done) => {
      const req = makeMockRequest();
      HttpManager.post(req, () => done());
    });

    it('executes with form-encoded body', (done) => {
      const req = makeMockRequest({ bodyParams: { key: 'value' } });
      HttpManager.post(req, () => done());
    });

    it('executes with JSON body', (done) => {
      const req = makeMockRequest({
        bodyParams: { key: 'value' },
        headers: { 'Content-Type': 'application/json' },
      });
      HttpManager.post(req, () => done());
    });
  });

  describe('DELETE', () => {
    it('executes', (done) => {
      const req = makeMockRequest();
      HttpManager.del(req, () => done());
    });
  });

  describe('PUT', () => {
    it('executes', (done) => {
      const req = makeMockRequest();
      HttpManager.put(req, () => done());
    });
  });
});

describe('WebapiError', () => {
  it('defaults message to empty string when not provided', () => {
    expect.assertions(2);
    const err = new WebapiError();
    expect(err.message).toBe('');
    expect(err.name).toBe('WebapiError');
  });

  it('stores provided message and statusCode', () => {
    expect.assertions(2);
    const err = new WebapiError('Something went wrong', 404);
    expect(err.message).toBe('Something went wrong');
    expect(err.statusCode).toBe(404);
  });
});
