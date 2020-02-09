'use strict';

var WebApiRequest = require('./webapi-request.js');
var HttpManager = require('./http-manager.js');
var Queue = require('./queue-methods.js');

function ChessWebAPI(options) {
  if (options && 'queue' in options && options['queue']) {
    this.addMethods(Queue)
    this.queueSetup();
  }
}

ChessWebAPI.prototype = {
  addMethods: function(methods) {
    for (var i in methods) {
      if (methods.hasOwnProperty(i)) {
        this[i] = methods[i];
      }
    }
  },

  ifChanged: async function(etag, method, parameters, options, callback, headers) {
    try {
      if (!etag || typeof etag != "string") throw "etag required for ifChanged";
      if (!method || typeof method != 'function') throw "dispatch requires request function";
      var actualParameters, actualCallback, actualOptions;
      var items = [parameters, options, callback];
      for (let i = 0; i < items.length; i++) {
        if (!items[i]) continue;
        if (items[i] instanceof Array) actualParameters = items[i];
        else if (typeof items[i] == 'object') actualOptions = items[i];
        else if (typeof items[i] == 'function') actualCallback = items[i];
      }
      
      let response = {changed: true, response: await method(...(actualParameters ? actualParameters : []), (actualOptions ? actualOptions : {}), (actualCallback ? actualCallback : null), {"If-None-Match": etag})};
      return response;
    } catch(error) {
      return {changed: false};
    }
  },

  getPlayer: function(username, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username)
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getPlayerStats: function(username, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/stats')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getPlayerOnline: function(username, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/is-online')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getPlayerCurrentDailyChess: function(username, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/games')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getPlayerToMoveDailyChess: function(username, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/games/to-move')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getPlayerMonthlyArchives: function(username, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/games/archives')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getPlayerCompleteMonthlyArchives: function(username, year, month, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};
    var monthFormat = "";
    if (typeof month == 'number' && month < 10) {
      monthFormat += "0" + month;
    } else if (typeof month == 'string' && month.length == 1) {
      monthFormat += "0" + month;
    } else {
      monthFormat += month;
    }

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/games/' + year + '/' + monthFormat)
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getPlayerMultiGamePGN: function(username, year, month, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};
    var monthFormat = "";
    if (typeof month == 'number' && month < 10) {
      monthFormat += "0" + month;
    } else if (typeof month == 'string' && month.length == 1) {
      monthFormat += "0" + month;
    } else {
      monthFormat += month;
    }

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/games/' + year + '/' + monthFormat + '/pgn')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getPlayerClubs: function(username, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/clubs')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getPlayerMatches: function(username, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/matches')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getPlayerTournaments: function(username, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/tournaments')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getTitledPlayers: function(titleAbbrev, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/titled/' + titleAbbrev)
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getClub: function(urlID, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/club/' + urlID)
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getClubMembers: function(urlID, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/club/' + urlID + '/members')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getClubMatches: function(urlID, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/club/' + urlID + '/matches')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getTournament: function(urlID, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/tournament/' + urlID)
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getTournamentRound: function(urlID, round, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/tournament/' + urlID + '/' + round)
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getTournamentRoundGroup: function(urlID, round, group, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/tournament/' + urlID + '/' + round + '/' + group)
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getTeamMatch: function(id, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/match/' + id)
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getTeamMatchBoard: function(id, board, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/match/' + id + '/' + board)
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getTeamLiveMatch: function(id, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/match/live/' + id)
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getTeamLiveMatchBoard: function(id, board, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/match/live/' + id + '/' + board)
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getCountry: function(iso, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/country/' + iso)
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getCountryPlayers: function(iso, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/country/' + iso + '/players')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getCountryClubs: function(iso, options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/country/' + iso + '/clubs')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getDailyPuzzle: function(options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/puzzle')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getDailyPuzzleRandom: function(options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/puzzle/random')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getStreamers: function(options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/streamers')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  getLeaderboards: function(options, callback, headers) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
    if (!headers) headers = {};

    return WebApiRequest.builder()
      .withPath('/pub/leaderboards')
      .withQueryParameters(actualOptions)
      .withHeaders(headers)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

};

module.exports = ChessWebAPI;