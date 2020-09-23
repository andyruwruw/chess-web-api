const WebApiRequest = require('../request/webapi-request.js');
const HttpManager = require('../request/http-manager.js');
const { sortParameters } = require('../utils/sort-parameters');

function getCountry(iso, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/country/${iso}`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getCountryPlayers(iso, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/country/${iso}/players`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getCountryClubs(iso, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/country/${iso}/clubs`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

module.exports = {
  getCountry,
  getCountryPlayers,
  getCountryClubs,
};
