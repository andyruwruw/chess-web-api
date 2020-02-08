let ChessAPI = require('./src/server.js');

let chess = new ChessAPI();

async function test() {
    console.log(await chess.playerProfile('andyruwruw'));
}

test();