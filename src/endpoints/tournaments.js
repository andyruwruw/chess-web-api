const WebApiRequest = require('../request/webapi-request.js');
const HttpManager = require('../request/http-manager.js');
const { sortParameters } = require('../utils/sort-parameters');

function getTournament(urlID, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/tournament/${urlID}`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getTournamentRound(urlID, round, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/tournament/${urlID}/${round}`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getTournamentRoundGroup(urlID, round, group, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/tournament/${urlID}/${round}/${group}`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

module.exports = {
  getTournament,
  getTournamentRound,
  getTournamentRoundGroup,
};
