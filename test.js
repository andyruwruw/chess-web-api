let ChessAPI = require('./src/server.js');

let chessAPI = new ChessAPI({queue: true});

let tests = 29;
let passed = 0;

// Just testing that I get results back.

let logResults = function(response) {
    if ('body' in response) {
        passed += 1;
        console.log("Tests:", passed, "/", tests);
        if (passed == tests) {
            console.log("All tests passed.");
        }
    } else {
        console.log("TEST FAILED", response);
    }
}

let testEndpoints = function() {
    try { 
        // 1
        chessAPI.dispatch(chessAPI.getPlayer, logResults, ["andyruwruw"]);
        // 2
        chessAPI.dispatch(chessAPI.getPlayerStats, logResults, ["andyruwruw"]);
        // 3
        chessAPI.dispatch(chessAPI.getPlayerOnline, logResults, ["andyruwruw"]);
        // 4
        chessAPI.dispatch(chessAPI.getPlayerCurrentDailyChess, logResults, ["andyruwruw"]);
        // 5
        chessAPI.dispatch(chessAPI.getPlayerToMoveDailyChess, logResults, ["andyruwruw"]);
        // 6
        chessAPI.dispatch(chessAPI.getPlayerMonthlyArchives, logResults, ["andyruwruw"]);
        // 7
        chessAPI.dispatch(chessAPI.getPlayerCompleteMonthlyArchives, logResults, ["andyruwruw", 2019, 8]);
        // 8
        chessAPI.dispatch(chessAPI.getPlayerMultiGamePGN, logResults, ["andyruwruw", 2019, 8]);
        // 9
        chessAPI.dispatch(chessAPI.getPlayerClubs, logResults, ["andyruwruw"]);
        // 10
        chessAPI.dispatch(chessAPI.getPlayerMatches, logResults, ["andyruwruw"]);
        // 11
        chessAPI.dispatch(chessAPI.getPlayerTournaments, logResults, ["andyruwruw"]);
        // 12
        chessAPI.dispatch(chessAPI.getTitledPlayers, logResults, ["GM"]);
        // 13
        chessAPI.dispatch(chessAPI.getClub, logResults, ["chess-com-developer-community"]);
        // 14
        chessAPI.dispatch(chessAPI.getClubMembers, logResults, ["chess-com-developer-community"]);
        // 15
        chessAPI.dispatch(chessAPI.getClubMatches, logResults, ["team-usa-southwest"]);
        // 16
        chessAPI.dispatch(chessAPI.getTournament, logResults, ["-33rd-chesscom-quick-knockouts-1401-1600"]);
        // 17
        chessAPI.dispatch(chessAPI.getTournamentRound, logResults, ["-33rd-chesscom-quick-knockouts-1401-1600", "1"]);
        // 18
        chessAPI.dispatch(chessAPI.getTournamentRoundGroup, logResults, ["-33rd-chesscom-quick-knockouts-1401-1600", "1", "1"]);
        // 19
        chessAPI.dispatch(chessAPI.getTeamMatch, logResults, [12803]);
        // 20
        chessAPI.dispatch(chessAPI.getTeamMatchBoard, logResults, [12803, 1]);
        // 21
        chessAPI.dispatch(chessAPI.getTeamLiveMatch, logResults, [5833]);
        // 22
        chessAPI.dispatch(chessAPI.getTeamLiveMatchBoard, logResults, [5833, 5]);
        // 23
        chessAPI.dispatch(chessAPI.getCountry, logResults, ["IT"]);
        // 24
        chessAPI.dispatch(chessAPI.getCountryPlayers, logResults, ["IT"]);
        // 25
        chessAPI.dispatch(chessAPI.getCountryClubs, logResults, ["IT"]);
        // 26
        chessAPI.dispatch(chessAPI.getDailyPuzzle, logResults, []);
        // 27
        chessAPI.dispatch(chessAPI.getDailyPuzzleRandom, logResults, []);
        // 28
        chessAPI.dispatch(chessAPI.getStreamers, logResults, []);
        // 29
        chessAPI.dispatch(chessAPI.getLeaderboards, logResults, []);
    } catch(error) {
        console.log(error);
    }
}

testEndpoints();




