'use strict';

var WebApiRequest = require('./webapi-request');
var HttpManager = require('./http-manager');

function ChessWebAPI() {
  
}

ChessWebAPI.prototype = {

  /**
   * Look up a player's profile by username
   * 
   * @param {string} username player username.
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  playerProfile: function(username, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username)
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

   /**
   * Get ratings, win/loss, and other stats about a player's game play, tactics, lessons and Puzzle Rush score.
   * 
   * @param {string} username player username.
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  playerStats: function(username, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/stats')
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * Tells if a user has been online in the last five minutes.
   * 
   * @param {string} username player username.
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  playerOnline: function(username, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/is-online')
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * Array of Daily Chess games that a player is currently playing.
   * 
   * @param {string} username player username.
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  playerCurrentDailyChess: function(username, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/games')
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * Array of Daily Chess games where it is the player's turn to act.
   * 
   * @param {string} username player username.
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  playerToMoveDailyChess: function(username, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/games/to-move')
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * Array of monthly archives available for this player.
   * 
   * @param {string} username player username.
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  playerMonthlyArchives: function(username, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/games/archives')
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * Array of Live and Daily Chess games that a player has finished.
   * 
   * @param {string} username player username.
   * @param {number | string} year Four digit year of game-end
   * @param {number | string} month Two digit month
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  playerCompleteMonthlyArchives: function(username, year, month, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
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
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * standard multi-game format PGN containing all games for a month.
   * 
   * @param {string} username player username.
   * @param {number | string} year Four digit year of game-end
   * @param {number | string} month Two digit month
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  playerMultiGamePGN: function(username, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }
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
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * List of Team matches the player has attended, is particpating or is currently registered.
   * 
   * @param {string} username player username.
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  playerMatches: function(username, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/matches')
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * List of tournaments the player is registered, is attending or has attended in the past.
   * 
   * @param {string} username player username.
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  playerTournaments: function(username, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/player/' + username + '/tournaments')
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * List of titled-player usernames.
   * 
   * @param {string} titleAbbrev valid abbreviations are "GM", "WGM", "IM", "WIM", "FM", "WFM", "NM", "WNM", "CM", "WCM"
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  titledPlayers: function(titleAbbrev, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/titled/' + titleAbbrev)
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * Get additional details about a club.
   * 
   * @param {string} urlID All club-based URLs use the club's "URL ID" to specify which club you want data for.
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  clubProfile: function(urlID, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/club/' + urlID)
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * Get Club members
   * 
   * @param {string} urlID All club-based URLs use the club's "URL ID" to specify which club you want data for.
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  clubMembers: function(urlID, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/club/' + urlID + '/members')
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * List of daily and club matches, grouped by status (registered, in progress, finished).
   * 
   * @param {string} urlID All club-based URLs use the club's "URL ID" to specify which club you want data for.
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  clubMembers: function(urlID, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/club/' + urlID + '/matches')
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * Get details about a daily, live and arena tournament.
   * 
   * @param {string} urlID All club-based URLs use the club's "URL ID" to specify which club you want data for.
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  tournament: function(urlID, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/tournament/' + urlID)
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * Get details about a tournament's round.
   * 
   * @param {string} urlID All club-based URLs use the club's "URL ID" to specify which club you want data for.
   * @param {string} round round number
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  tournamentRound: function(urlID, round, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/tournament/' + urlID + '/' + round)
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * Get details about a tournament's round.
   * 
   * @param {string} urlID 
   * @param {string} round round number
   * @param {string} group 
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  tournamentRoundGroup: function(urlID, round, group, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/tournament/' + urlID + '/' + round + '/' + group)
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * Get details about a team match and players playing that match. After the match is finished there will be a link to each player's stats endpoint, in order to get up-to-date information about the player.
   * 
   * @param {string} id 
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  teamMatch: function(id, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/match/' + id)
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },

  /**
   * Get details about a team match and players playing that match. After the match is finished there will be a link to each player's stats endpoint, in order to get up-to-date information about the player.
   * 
   * @param {string} id 
   * @param {string} board 
   * @param {Object} [options] Additional options to be added.
   * Chess.com allows for `callback` option with function name.
   * @param {requestCallback} [callback] Optional callback method to be called instead of the promise.
   * @returns {Promise|undefined} Returns promise upon success.
   */
  teamMatchBoard: function(id, board, options, callback) {
    var actualCallback, actualOptions;
    if (typeof options === 'function' && !callback) {
      actualCallback = options;
      actualOptions = {};
    } else {
      actualCallback = callback;
      actualOptions = options;
    }

    return WebApiRequest.builder()
      .withPath('/pub/match/' + id + '/' + board)
      .withQueryParameters(actualOptions)
      .build()
      .execute(HttpManager.get, actualCallback);
  },


};

ChessWebAPI._addMethods = function(methods) {
  for (var i in methods) {
    if (methods.hasOwnProperty(i)) {
      this.prototype[i] = methods[i];
    }
  }
};

module.exports = ChessWebAPI;