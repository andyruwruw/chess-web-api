const Request = require('./base-request');
const { version } = require('../../package.json');

const DEFAULT_HOST = 'api.chess.com';
const DEFAULT_PORT = 443;
const DEFAULT_SCHEME = 'https';
const DEFAULT_USER_AGENT = `chess-web-api/${version} (https://github.com/andyruwruw/chess-web-api)`;

module.exports.builder = function () {
  return Request.builder()
    .withHost(DEFAULT_HOST)
    .withPort(DEFAULT_PORT)
    .withScheme(DEFAULT_SCHEME)
    .withHeaders({ 'User-Agent': DEFAULT_USER_AGENT });
};
