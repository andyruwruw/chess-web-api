const WebApiRequest = require('../request/webapi-request.js');
const HttpManager = require('../request/http-manager.js');
const { sortParameters } = require('../utils/sort-parameters');

function getPlayer(username, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/player/${username}`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getPlayerStats(username, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/player/${username}/stats`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getPlayerOnline(username, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/player/${username}/is-online`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getPlayerCurrentDailyChess(username, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/player/${username}/games`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getPlayerToMoveDailyChess(username, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/player/${username}/games/to-move`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getPlayerMonthlyArchives(username, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/player/${username}/games/archives`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getPlayerCompleteMonthlyArchives(username, year, month, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  let _month;
  if ((typeof month === 'number' && month < 10)
    || (typeof month === 'string' && month.length === 1)) {
    _month = `0${month}`;
  } else {
    _month = `${month}`;
  }

  return WebApiRequest.builder()
    .withPath(`/pub/player/${username}/games/${year}/${_month}`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getPlayerMultiGamePGN(username, year, month, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  let _month;
  if ((typeof month === 'number' && month < 10)
    || (typeof month === 'string' && month.length === 1)) {
    _month = `0${month}`;
  } else {
    _month = `${month}`;
  }

  return WebApiRequest.builder()
    .withPath(`/pub/player/${username}/games/${year}/${_month}/pgn`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getPlayerClubs(username, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/player/${username}/clubs`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getPlayerMatches(username, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/player/${username}/matches`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getPlayerTournaments(username, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/player/${username}/tournaments`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

function getTitledPlayers(titleAbbrev, options, callback, headers) {
  const [_options, _callback, _headers] = sortParameters(
    ['object', 'function', 'object'],
    [options, callback, headers],
  );

  return WebApiRequest.builder()
    .withPath(`/pub/titled/${titleAbbrev}`)
    .withQueryParameters(_options)
    .withHeaders(_headers)
    .build()
    .execute(HttpManager.get, _callback);
}

module.exports = {
  getPlayer,
  getPlayerStats,
  getPlayerOnline,
  getPlayerCurrentDailyChess,
  getPlayerToMoveDailyChess,
  getPlayerMonthlyArchives,
  getPlayerCompleteMonthlyArchives,
  getPlayerMultiGamePGN,
  getPlayerClubs,
  getPlayerMatches,
  getPlayerTournaments,
  getTitledPlayers,
};
