let ChessAPI = require('chess-web-api');
let axios = require('axios');
let chessAPI = new ChessAPI({queue: true});
let comparing = function (test, valid) {
    if (typeof valid != 'object') {
        if (valid instanceof Array && test instanceof Array) return true;
        else if (valid == test) return true;
        else return false;
    }
    if (typeof test != typeof valid) return false;
    let testKeys = Object.keys(test);
    let validKeys = Object.keys(valid);
    for (let i = 0; i < validKeys.length; i++) {
        if (!(testKeys.includes(validKeys[i]))) return false;
        if (typeof valid[validKeys[i]] != typeof test[testKeys[i]]) return false;
        if (!(comparing(test[testKeys[i]], valid[validKeys[i]]))) return false;
    }
    return true;
}
let printResults = function(x) {
    if (x) console.log('-- Passed --');
    else console.log("## FAILED ##");
}
var assert = { isTrue: function(x) { printResults(x); } };
let generateTests = async function() {
    let tests = [
        {title: 'getPlayer', method: chessAPI.getPlayer, parameters: ['andyruwruw'], url: 'https://api.chess.com/pub/player/andyruwruw'},
        {title: 'getPlayerStats', method: chessAPI.getPlayerStats, parameters: ['andyruwruw'], url: 'https://api.chess.com/pub/player/andyruwruw/stats'},
        {title: 'getPlayerOnline', method: chessAPI.getPlayerOnline, parameters: ['andyruwruw'], url: 'https://api.chess.com/pub/player/andyruwruw/is-online'},
        {title: 'getPlayerCurrentDailyChess', method: chessAPI.getPlayerCurrentDailyChess, parameters: ['andyruwruw'], url: 'https://api.chess.com/pub/player/andyruwruw/games'},
        {title: 'getPlayerToMoveDailyChess', method: chessAPI.getPlayerToMoveDailyChess, parameters: ['andyruwruw'], url: 'https://api.chess.com/pub/player/andyruwruw/games/to-move'},
        {title: 'getPlayerMonthlyArchives', method: chessAPI.getPlayerMonthlyArchives, parameters: ['andyruwruw'], url: 'https://api.chess.com/pub/player/andyruwruw/games/archives'},
        {title: 'getPlayerCompleteMonthlyArchives', method: chessAPI.getPlayerCompleteMonthlyArchives, parameters: ['erik', 2019, 10], url: 'https://api.chess.com/pub/player/erik/games/2019/10'},
        {title: 'getPlayerMultiGamePGN', method: chessAPI.getPlayerMultiGamePGN, parameters: ['erik', 2019, 10], url: 'https://api.chess.com/pub/player/erik/games/2019/10/pgn'},
        {title: 'getPlayerClubs', method: chessAPI.getPlayerClubs, parameters: ['andyruwruw'], url: 'https://api.chess.com/pub/player/andyruwruw/clubs'},
        {title: 'getPlayerMatches', method: chessAPI.getPlayerMatches, parameters: ['andyruwruw'], url: 'https://api.chess.com/pub/player/andyruwruw/matches'},
        {title: 'getPlayerTournaments', method: chessAPI.getPlayerTournaments, parameters: ['andyruwruw'], url: 'https://api.chess.com/pub/player/andyruwruw/tournaments'},
        {title: 'getTitledPlayers', method: chessAPI.getTitledPlayers, parameters: ['GM'], url: 'https://api.chess.com/pub/titled/GM'},
        {title: 'getClub', method: chessAPI.getClub, parameters: ["chess-com-developer-community"], url: 'https://api.chess.com/pub/club/chess-com-developer-community'},
        {title: 'getClubMembers', method: chessAPI.getClubMembers, parameters: ["chess-com-developer-community"], url: 'https://api.chess.com/pub/club/chess-com-developer-community/members'},
        {title: 'getClubMatches', method: chessAPI.getClubMatches, parameters: ['team-usa-southwest'], url: 'https://api.chess.com/pub/club/team-usa-southwest/matches'},
        {title: 'getTournament', method: chessAPI.getTournament, parameters: ['-33rd-chesscom-quick-knockouts-1401-1600'], url: 'https://api.chess.com/pub/tournament/-33rd-chesscom-quick-knockouts-1401-1600'},
        {title: 'getTournamentRound', method: chessAPI.getTournamentRound, parameters: ['-33rd-chesscom-quick-knockouts-1401-1600', 1], url: 'https://api.chess.com/pub/tournament/-33rd-chesscom-quick-knockouts-1401-1600/1'},
        {title: 'getTournamentRoundGroup', method: chessAPI.getTournamentRoundGroup, parameters: ['-33rd-chesscom-quick-knockouts-1401-1600', 1, 1], url: 'https://api.chess.com/pub/tournament/-33rd-chesscom-quick-knockouts-1401-1600/1/1'},
        {title: 'getTeamMatch', method: chessAPI.getTeamMatch, parameters: ['12803'], url: 'https://api.chess.com/pub/match/12803'},
        {title: 'getTeamMatchBoard', method: chessAPI.getTeamMatchBoard, parameters: ['12803', 1], url: 'https://api.chess.com/pub/match/12803/1'},
        {title: 'getTeamLiveMatch', method: chessAPI.getTeamLiveMatch, parameters: ['5833'], url: 'https://api.chess.com/pub/match/live/5833'},
        {title: 'getTeamLiveMatchBoard', method: chessAPI.getTeamLiveMatchBoard, parameters: ['5833', 5], url: 'https://api.chess.com/pub/match/live/5833/5'},
        {title: 'getCountry', method: chessAPI.getCountry, parameters: ['IT'], url: 'https://api.chess.com/pub/country/IT'},
        {title: 'getCountryPlayers', method: chessAPI.getCountryPlayers, parameters: ['IT'], url: 'https://api.chess.com/pub/country/IT/players'},
        {title: 'getCountryClubs', method: chessAPI.getCountryClubs, parameters: ['IT'], url: 'https://api.chess.com/pub/country/IT/clubs'},
        {title: 'getDailyPuzzle', method: chessAPI.getDailyPuzzle, parameters: [], url: 'https://api.chess.com/pub/puzzle'},
        //{title: 'getDailyPuzzleRandom', method: chessAPI.getDailyPuzzleRandom, parameters: [], url: 'https://api.chess.com/pub/puzzle/random'}, Untestable
        {title: 'getStreamers', method: chessAPI.getStreamers, parameters: [], url: 'https://api.chess.com/pub/streamers'},
        {title: 'getLeaderboards', method: chessAPI.getLeaderboards, parameters: [], url: 'https://api.chess.com/pub/leaderboards'},
    ];
    return tests;
}
let tryTests = async function () {
    let tests = await generateTests();
    for (let i = 0; i < tests.length; i++) {
        console.log("Test", (i + 1) + ":", tests[i].title);
        let method = tests[i].method;
        let libraryData = await method(...tests[i].parameters);
        let axiosData = await axios.get(tests[i].url);
        assert.isTrue(comparing(libraryData.body, axiosData.data))
    }
}
tryTests();
