# chess-web-api

This is a lightweight wrapper for the [Chess.com Published-Data API](https://www.chess.com/news/view/published-data-api). It includes helper functions for **all the endpoints**, such as player profile data, current daily chess, monthly archives, clubs, tournaments and more.

Please read their [notes on data currency, language and rate limits on parallel requests](https://www.chess.com/news/view/published-data-api). They're good to know before you implement this into your work.

`chess-web-api` can be inicialized with a [priority queue](#Usage-(With-Queue)) for requests to prevent parellel requests. Using the queue requires passing in a `callback function` for the result to be sent to.

[Chess.com Published-Data API](https://www.chess.com/news/view/published-data-api) also allows clients to provide an `etag` from a previous response to check if data since the last request has changed. This has been implemented into `chess-web-api`'s [ifChanged function](#ifChanged-Function) to make any of the requests.

I'll try to keep this library updated if they're API changes, feel free to submit any [issues](https://github.com/andyruwruw/chess-web-api/issues).

---

## Table of Contents

- [Features](#Features)
- [Installation](#Installation)
- [Usage (Without Queue)](#Usage-(Without-Queue))
- [Usuage (With Queue)](#Usage-(With-Queue))
- [ifChanged Function](#ifChanged-Function)
- [Helper Functions](#Helper-Functions)

---

## Features

The wrapper includes helper functions to do the following: 

#### Profile Data
- Profile
- Titled Players
- Stats
- Player online status
#### Player Games
- Current Daily Chess
- Concise To-Move Daily Chess
- Available Archives
- Monthly Archives
- Multi-Game PGN Download
#### Player Participation
- List of Clubs
- Team Matches
- Tournaments
#### Clubs
- Club Profile
- List of members, by activity level
- Team Matches
#### Tournaments
- Tournament
- Tournament Round
- Tournament Round's Group
#### Team Matches
- Daily Team Match
- Daily Team Match Board
- Live Team Match
- Live Team Match Board
#### Countries
- Country Profile
- List of Players
- List of Clubs
#### Daily Puzzle
- Daily Puzzle
- Random Daily Puzzle
#### Streamers
- Streamers
#### Leaderboards
- Leaderboards

---

## Installation

Install via node:

    $ npm install -S chess-web-api

Then, in your javascript file
```
var ChessWebAPI = require('chess-web-api');

var chessAPI = new ChessWebAPI();
```
If you wish to use the built in [priority queue](#Usage-(With-Queue)) to avoid parallel requests, add the following paramter to the constructor:
```
var chessAPI = new ChessWebAPI({
    queue: true
});
```
---

## Usage (Without Queue)

To use `chess-web-api`, once you've create an instance of the library, call any of the functions on it.
```
var ChessWebAPI = require('chess-web-api');

var chessAPI = new ChessWebAPI();

chessAPI.getPlayer('andyruwruw')
    .then(function(response) {
        console.log('Player Profile', response.body);
    }, function(err) {
        console.error(err);
    });

chessAPI.getTitledPlayers('GM')
    .then(function(response) {
        console.log('Grand Masters', response.body.players);
    }, function(err) {
        console.error(err);
    });
```
---

## Usage (With Queue)

[Chess.com's API](https://www.chess.com/news/view/published-data-api#game-results) doesn't rate limit unless you've made parallel requests. If you have more than two active requests at a time, you'll recieve a `429 Too Many Requests` error. 

If you inicialize your `ChessWebAPI` with the queue enabled, you can still call any of the regular functions without using the queue.

```
var ChessWebAPI = require('chess-web-api');

var chessAPI = new ChessWebAPI({
    queue: true,
});

chessAPI.getTitledPlayers('GM')
    .then(function(response) {
        console.log('Grand Masters', response.body.players);
    }, function(err) {
        console.error(err);
    });
```

To add something to the queue, use the method `dispatch`.

Dispatch Parameters:
- chess-web-api function for request (`function`)
- callback function (`function`)
- parameters (`array`)
- options (`object`)
- priority (`number`, 1 is prioritized first))

| Name       | Type       | Description                                       |
|------------|------------|---------------------------------------------------|
| method     | `function` | `chess-web-api` function for request.             |
| callback   | `function` | Function to be called with result                 |
| parameters | `array`    | Array of parameters to be passed into the method. |
| options    | `object`   | Added options to the end of the URL (optional)    |
| priority   | `number`   | Priority in queue (1 is heighest priority) (optional)|

Example: 

```
var ChessWebAPI = require('chess-web-api');

var chessAPI = new ChessWebAPI({
    queue: true,
});

let printResults = function(response) {
    console.log(response.data);
}

chessAPI.dispatch(chessAPI.getPlayer, printResults, ["andyruwruw"], {}, 1);
chessAPI.dispatch(chessAPI.getTitled, printResults, ["GM"], {}, 1);
chessAPI.dispatch(chessAPI.getPlayerCurrentDailyChess, printResults, ["andyruwruw"], {}, 1);
chessAPI.dispatch(chessAPI.getPlayerCompleteMonthlyArchives, printResults, ["andyruwruw", 2019, 10], {}, 1);
```
---

## ifChanged Function

#### Parameters:

| Name       | Type       | Description                                       |
|------------|------------|---------------------------------------------------|
| etag       | `string`   | ID of last request made. Found in the header.     |
| method     | `function` | `chess-web-api` function for request.             |
| parameters | `array`    | Array of parameters to be passed into the method. |
| options    | `object`   | Added options to the end of the URL (optional)    |
| callback   | `function` | Function to be called with result (optional)      |

#### Returns `Object`

`ifChanged` allows you to make any of the helper functions with the added parameter of the `etag` provided in the header of the last simular request.

`ifChanged` will return either of the following:

```
// If data has changed, response is attatched.
{
    changed: true,
    response: // response from chess.com
}

// If data has not been updated.
{
    changed: false,
}
```

Example:
```
var games, etag;

// Gets the games and stores an etag.
var trackGames = async function() {
    let response = await chessAPI.getPlayerCurrentDailyChess('andyruwruw');
    games = response.body.games;
    etag = response.headers.etag;

    // runs checkGames every 10 seconds.
    setInterval(checkGames, 10000);
}

var checkGames = async function() {
    // Makes the request but with ifChanged
    let gamesChanged = await chessAPI.ifChanged(etag, chessAPI.getPlayerCurrentDailyChess, ['andyruwruw']);

    // Updates variables if new data is available.
    if (gamesChanged.changed) {
        games = gamesChanged.response.body.games;
        etag = gamesChanged.response.headers.etag;
    }
}

trackGames();
```

## Helper Functions




