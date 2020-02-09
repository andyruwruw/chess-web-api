let ChessAPI = require('./src/server.js');

let chessAPI = new ChessAPI({queue: true});

var games, etag;

var checkGames = async function() {
    let gamesChanged = await chessAPI.ifChanged(etag, chessAPI.getPlayerCurrentDailyChess, ['andyruwruw']);

    console.log(Object.keys(gamesChanged));
    
    if (gamesChanged.changed) {
        games = gamesChanged.response.body.games;
        etag = gamesChanged.response.headers.etag;
        console.log("CHANGED");
    } else {
        console.log("Not Changed");
    }
}

async function first() {
    let response = await chessAPI.getPlayerCurrentDailyChess('andyruwruw');
    console.log(response.headers);
    etag = response.headers.etag;
    games = response.body.games;
    
    console.log(games.length);
    console.log(etag);

    setInterval(checkGames, 5000);
}

first();




