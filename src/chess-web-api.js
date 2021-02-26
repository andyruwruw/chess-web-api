const Queue = require('./queue/index');
const {
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
} = require('./endpoints/player-data');
const {
  getClub,
  getClubMembers,
  getClubMatches,
} = require('./endpoints/clubs');
const {
  getTournament,
  getTournamentRound,
  getTournamentRoundGroup,
} = require('./endpoints/tournaments');
const {
  getTeamMatch,
  getTeamMatchBoard,
  getTeamLiveMatch,
  getTeamLiveMatchBoard,
} = require('./endpoints/team-matches');
const {
  getCountry,
  getCountryPlayers,
  getCountryClubs,
} = require('./endpoints/countries');
const {
  getDailyPuzzle,
  getDailyPuzzleRandom,
} = require('./endpoints/puzzles');
const {
  getStreamers,
} = require('./endpoints/streamers');
const {
  getLeaderboards,
} = require('./endpoints/leaderboards');
const {
  getGameByID,
} = require('./endpoints/games');

function ChessWebAPI(options) {
  if (options && 'queue' in options && options.queue) {
    this.addMethods(Queue);
    this.queueSetup();
  }
}

ChessWebAPI.prototype = {
  addMethods(methods) {
    const queueMethods = Object.keys(methods);

    for (let i = 0; i < queueMethods.length; i += 1) {
      this[queueMethods[i]] = methods[queueMethods[i]];
    }
  },

  async ifChanged(etag, method, parameters, options, callback) {
    if (!etag || typeof etag !== 'string') {
      throw Error('etag required for ifChanged');
    }
    if (!method || typeof method !== 'function') {
      throw Error('dispatch requires request function');
    }

    let actualParameters = [];
    let actualCallback = null;
    let actualOptions = {};

    const items = [parameters, options, callback];

    for (let i = 0; i < items.length; i += 1) {
      if (items[i]) {
        if (items[i] instanceof Array) {
          actualParameters = items[i];
        } else if (typeof items[i] === 'object') {
          actualOptions = items[i];
        } else if (typeof items[i] === 'function') {
          actualCallback = items[i];
        }
      }
    }

    try {
      const data = await method(
        ...actualParameters,
        actualOptions,
        actualCallback,
        {
          'If-None-Match': etag,
        },
      );

      const response = {
        changed: true,
        response: data,
      };

      return response;
    } catch (error) {
      return { changed: false };
    }
  },

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

  getClub,
  getClubMembers,
  getClubMatches,

  getTournament,
  getTournamentRound,
  getTournamentRoundGroup,

  getTeamMatch,
  getTeamMatchBoard,
  getTeamLiveMatch,
  getTeamLiveMatchBoard,

  getCountry,
  getCountryPlayers,
  getCountryClubs,

  getDailyPuzzle,
  getDailyPuzzleRandom,

  getStreamers,

  getLeaderboards,

  getGameByID,
};

module.exports = ChessWebAPI;
