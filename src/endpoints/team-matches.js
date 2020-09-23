const WebApiRequest = require('../request/webapi-request.js');
const HttpManager = require('../request/http-manager.js');
const { sortParameters } = require('../utils/sort-parameters');

function getTeamMatch(id, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/match/${id}`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getTeamMatchBoard(id, board, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/match/${id}/${board}`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getTeamLiveMatch(id, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/match/live/${id}`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getTeamLiveMatchBoard(id, board, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/match/live/${id}/${board}`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

module.exports = {
  getTeamMatch,
  getTeamMatchBoard,
  getTeamLiveMatch,
  getTeamLiveMatchBoard,
};
