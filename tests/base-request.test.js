/* eslint-disable no-undef */
const BaseRequest = require('../src/request/base-request');

const makeRequest = (overrides = {}) => BaseRequest.builder()
  .withScheme(overrides.scheme || 'https')
  .withHost(overrides.host || 'api.chess.com')
  .withPort(overrides.port !== undefined ? overrides.port : 443)
  .withPath(overrides.path || '/pub')
  .build();

describe('BaseRequest', () => {
  describe('Request constructor', () => {
    it('throws when no builder is supplied', () => {
      expect.assertions(1);
      const Request = makeRequest().constructor;
      expect(() => Request()).toThrow('No builder supplied to constructor');
    });
  });

  describe('getURI', () => {
    it('throws when scheme is missing', () => {
      expect.assertions(1);
      const req = makeRequest();
      req.scheme = null;
      expect(() => req.getURI()).toThrow('Missing components necessary to construct URI');
    });

    it('omits path when not set', () => {
      expect.assertions(1);
      const req = BaseRequest.builder()
        .withScheme('https')
        .withHost('api.chess.com')
        .withPort(443)
        .build();
      expect(req.getURI()).toBe('https://api.chess.com');
    });

    it('omits default HTTPS port (443)', () => {
      expect.assertions(1);
      expect(makeRequest().getURI()).toBe('https://api.chess.com/pub');
    });

    it('omits default HTTP port (80)', () => {
      expect.assertions(1);
      expect(makeRequest({ scheme: 'http', port: 80 }).getURI()).toBe('http://api.chess.com/pub');
    });

    it('includes non-default HTTPS port', () => {
      expect.assertions(1);
      expect(makeRequest({ port: 8443 }).getURI()).toBe('https://api.chess.com:8443/pub');
    });

    it('includes non-default HTTP port', () => {
      expect.assertions(1);
      expect(makeRequest({ scheme: 'http', port: 8080 }).getURI()).toBe('http://api.chess.com:8080/pub');
    });
  });

  describe('getURL', () => {
    it('returns URI when no query parameters', () => {
      expect.assertions(1);
      const req = makeRequest();
      expect(req.getURL()).toBe(req.getURI());
    });

    it('appends query parameters to URI', () => {
      expect.assertions(1);
      const req = BaseRequest.builder()
        .withScheme('https')
        .withHost('api.chess.com')
        .withPort(443)
        .withPath('/pub')
        .withQueryParameters({ format: 'json', max: '10' })
        .build();
      expect(req.getURL()).toContain('format=json');
    });
  });

  describe('getQueryParameterString', () => {
    it('returns empty string when no query params set', () => {
      expect.assertions(1);
      expect(makeRequest().getQueryParameterString()).toBe('');
    });
  });

  describe('Builder._assign', () => {
    it('replaces value when an Array is passed', () => {
      expect.assertions(1);
      const req = BaseRequest.builder()
        .withScheme('https')
        .withHost('api.chess.com')
        .withPort(443)
        .withHeaders(['header1', 'header2'])
        .build();
      expect(req.getHeaders()).toEqual(['header1', 'header2']);
    });

    it('returns existing value when empty object passed', () => {
      expect.assertions(1);
      const req = makeRequest();
      expect(req.getQueryParameters()).toBeUndefined();
    });
  });
});
