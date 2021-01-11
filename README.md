<div align="center">
    <image width="400" align="center"src="https://raw.githubusercontent.com/andyruwruw/chess-web-api/master/documentation/logo.png"/><br/>
</div>

<p align="center">Lightweight wrapper for the Chess.com public data API</p>

<p align="center" style="margin: 0px auto; margin-top: 15px; max-width: 600px">
    <a href="https://melophile.org"><img src="https://img.shields.io/npm/v/chess-web-api"></a>
    <a href="#"><img src="https://img.shields.io/npm/dt/chess-web-api"/></a>
</p>

# Overview

[chess-web-api](https://www.npmjs.com/package/chess-web-api) is a lightweight, unofficial wrapper for the [Chess.com public data API](https://www.chess.com/news/view/published-data-api).

It includes helper functions for all available endpoints, such as retrieving player data, current daily chess games, monthly archives, club data, tournaments and more.

Please read Chess.com's notes on [data currency, language and rate limits on parallel requests](https://www.chess.com/news/view/published-data-api#pubapi-general-current) before you implement this into your work.

I'll try to keep this library updated if they're API changes, feel free to [submit any issues](https://github.com/andyruwruw/chess-web-api/issues).

All endpoint descriptions were copied from [here](https://www.chess.com/news/view/published-data-api). It's here for ease of access only. Please go to the site to ensure the return values have not been changed.

# Documentation

- [Installation](#installation)
- Methods
    - Profile Data
        - [Player Profile](#get-players-profile)
        - [Player Stats](#get-players-statistics)
        - [Player Online Status](#get-players-online-status)
    - Player Games
        - [Current Daily Chess](#get-players-current-daily-chess-games)
        - [Concise To-Move Daily Chess](#get-players-concise-to-move-daily-chess-games)
        - [Available Archives](#get-players-available-monthly-archives)
        - [Monthly Archives](#get-players-completed-monthly-archives)
        - [Multi-Game PGN Download](#get-players-month-multi-game-pgns)
    - Player Participation
        - [List of Clubs](#get-players-clubs)
        - [Team Matches](#get-players-matches)
        - [Tournaments](#get-players-tournaments)
    - Clubs
        - [Club Profile](#get-a-club)
        - [List of members, by activity level](#get-a-clubs-members)
        - [Team Matches](#get-a-clubs-matches)
    - Tournaments
        - [Tournament](#get-a-tournament)
        - [Tournament Round](#get-a-tournament-round)
        - [Tournament Round's Group](#get-a-tournament-rounds-group)
    - Team Matches
        - [Daily Team Match](#get-a-team-match)
        - [Daily Team Match Board](#get-a-team-match-board)
        - [Live Team Match](#get-a-live-team-match)
        - [Live Team Match Board](#get-a-live-team-match-board)
    - Countries
        - [Country Profile](#get-a-country)
        - [List of Players](#get-a-countrys-players)
        - [List of Clubs](#get-a-countrys-clubs)
    - Daily Puzzle
        - [Daily Puzzle](#get-the-daily-puzzle)
        - [Random Daily Puzzle](#get-a-random-puzzle)
    - General
        - [Streamers](#get-list-of-streamers)
        - [Leaderboards](#get-leaderboards)
        - [Titled Players](#get-titled-players)
- [Priority Queue](#priority-queue)
    - [dispatch](#dispatch)
    - [clearQueue](#clear-queue)
- [Query for Changes](#query-doc)
    - [ifChanged](#if-changed)

# Installation

Install via node:

    $ npm i -S chess-web-api

Import the module and instantiate the wrapper.
```
var ChessWebAPI = require('chess-web-api');

var chessAPI = new ChessWebAPI();
```

You are then free to call any of the methods!

```
chessAPI.getPlayer('andyruwruw')
    .then(function(response) {
        console.log('Player Profile', response.body);
    }, function(err) {
        console.error(err);
    });
```

# [getPlayer(username, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-player)
Get additional details about a player in a game.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getPlayerStats(username, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-player-stats)
Get ratings, win/loss, and other stats about a player's game play, tactics, lessons and Puzzle Rush score.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getPlayerOnline(username, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-player-is-online)
Tells if an user has been online in the last five minutes.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getPlayerCurrentDailyChess(username, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-games-current)
Array of Daily Chess games that a player is currently playing.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getPlayerToMoveDailyChess(username, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-games-tomove)
Array of Daily Chess games where it is the player's turn to act.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getPlayerMonthlyArchives(username, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-games-archive-list)
Array of monthly archives available for this player.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getPlayerCompleteMonthlyArchives(username, year, month, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-games-archive)
Array of Live and Daily Chess games that a player has finished.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| year | **string / number**   | Year of matches.                   |
| month | **string / number**   | Month of matches.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getPlayerMultiGamePGN(username, year, month, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-games-pgn)
Standard multi-game format PGN containing all games for a month.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| year | **string / number**   | Year of matches.                   |
| month | **string / number**   | Month of matches.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getPlayerClubs(username, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-player-clubs)
List of clubs the player is a member of, with joined date and last activity date.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getPlayerMatches(username, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-player-matches)
List of Team matches the player has attended, is partecipating or is currently registered.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getPlayerTournaments(username, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-player-tournaments)
List of tournaments the player is registered, is attending or has attended in the past.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getClub(urlID, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-club-profile)
Get additional details about a club.

All club-based URLs use the club's "URL ID" to specify which club you want data for.

The url-ID is the same as found in the URL for the club's web page on www.chess.com. For example, the url-ID of the Chess.com Developer's Club is chess-com-developer-community.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| urlID | **string**   | Club's unique urlID                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getClubMembers(urlID, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-club-members)
List of club members (usernames and joined date timestamp), grouped by club-activity frequency. The club-activity is one of this actions.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| urlID | **string**   | Club's unique urlID                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getClubMatches(urlID, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-club-matches)
List of daily and club matches, grouped by status (registered, in progress, finished).
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| urlID | **string**   | Club's unique urlID                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getTournament(urlID, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-tournament-profile)
Get details about a daily, live and arena tournament.

All tournaments-based URLs use the tournament's "URL ID" to specify which tournament you want data for.

The url-ID is the same as found in the URL for the tournament's web page on www.chess.com. For example, the url-ID of the Chess.com Developer's Club is -33rd-chesscom-quick-knockouts-1401-1600
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| urlID | **string**   | Tournaments's unique urlID                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getTournamentRound(urlID, round, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-tournament-round)
Get details about a tournament's round.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| urlID | **string**   | Tournaments's unique urlID                   |
| round | **string / number**   | Round number                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getTournamentRoundGroup(urlID, round, group, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-tournament-round-group)
Get details about a tournament's round group.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| urlID | **string**   | Tournaments's unique urlID                   |
| round | **string / number**   | Round number                   |
| group | **string / number**   | Group number                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getTeamMatch(id, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-match-profile)
Get details about a team match and players playing that match. After the match is finished there will be a link to each player's stats endpoint, in order to get up-to-date information about the player.

All team matches-based URLs use the match "ID" to specify which match you want data for.

The ID is the same as found in the URL for the team match web page on www.chess.com. For example, the ID WORLD LEAGUE Round 5: Romania vs USA Southwest is 12803.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| id | **string / number**   | Id of desired team match.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getTeamMatchBoard(id, board, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-match-board)
Get details about a team match board. Only in-progress or finished games will be included, so there may be one or two games in this list.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| id | **string / number**   | Id of desired team match.                   |
| board | **string / number**   | Board identifier                  |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getTeamLiveMatch(id, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-match-live-profile)
Get details about a team match and players playing that match. After the match is finished there will be a link to each player's stats endpoint, in order to get up-to-date information about the player.

All live team matches-based URLs use the match "ID" to specify which match you want data for.

The ID is the same as found in the URL for the team match web page on www.chess.com. For example, the ID Friendly 5+2 is 5833.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| id | **string / number**   | Id of desired live team match.                  |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getTeamLiveMatchBoard(id, board, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-match-live-board)
Get details about a team match board. Only in-progress or finished games will be included, so there may be one or two games in this list.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| id | **string / number**   | Id of desired live team match.                  |
| board | **string / number**   | Board identifier                  |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getCountry(iso, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-country-profile)
Get additional details about a country.

All country-based URLs use the country's 2-character ISO 3166 code (capitalized) to specify which country you want data for.

Find their [code's here](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).

Additional countries not listed on that official list have been posted by [Chess.com](https://www.chess.com/news/view/published-data-api).
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| iso | **string**   | Country's ISO identifier                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getCountryPlayers(iso, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-country-players)
List of usernames for players who identify themselves as being in this country.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| iso | **string**   | Country's ISO identifier                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getCountryClubs(iso, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-country-clubs)
List of URLs for clubs identified as being in or associated with this country.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| iso | **string**   | Country's ISO identifier                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getDailyPuzzle(options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-daily-puzzle)
Information about the daily puzzle found in [www.chess.com](www.chess.com).
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getDailyPuzzleRandom(options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-random-daily-puzzle)
Information about a randomly picked daily puzzle.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getStreamers(options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-streamers)
Information about Chess.com streamers.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getLeaderboards(options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-leaderboards)
It displays information about top 50 player for daily and live games, tactics and lessons.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

# [getTitledPlayers(titleAbbrev, options, callback)](https://www.chess.com/news/view/published-data-api#pubapi-endpoint-titled)
Retrieves an array of usernames of players with a given title.

Valid title abbreviations are: GM, WGM, IM, WIM, FM, WFM, NM, WNM, CM, WCM.
### Parameters
| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| titleAbbrev | **string**   | GM, WGM, IM, WIM, FM, WFM, NM, WNM, CM, WCM.|
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |


# Priority Queue

The Chess.com public data API does not allow you to make two requests simultaneously. If you have more than two active requests at a time, you'll recieve a **429 Too Many Requests** error. 

chess-web-api can be initialized with a priority queue. All requests made through the queue will be made as soon as the previous returns. 

To use chess-web-api with a queue, instantiate the wrapper with the following option set to true:
```
var ChessWebAPI = require('chess-web-api');

var chessAPI = new ChessWebAPI({
    queue: true,
});
```

Using the queue requires the passing of a callback function as a parameter.

To add something to the queue, use the method dispatch.

<h1 id="dispatch">
    dispatch(method, callback, parameters, options, callbackParameters, priority)
</h1>

Adds an item to the priority queue.

The provided callback method will be provided two parameters **(response, error)**. Response is the full request result.

Additional parameters can be passed to the callback in **callbackParameters**.

The dispatch function determines the difference between parameters to be passed into the **chess-web-api method** vs the **callback function** by order. 

The **first array** passed into dispatch will always be passed into the **chess-web-api method**. 

The **second array** will always be sent to the **callback function**, with the response to the request as the first parameter. See example.

### Parameters
| Name       | Type       | Description                                       |
|------------|------------|---------------------------------------------------|
| method     | **function** | **chess-web-api** function for request.             |
| callback   | **function** | Function to be called with result                 |
| parameters | **array**    | Array of parameters to be passed into the method. |
| options    | **object**   | Added options to the end of the URL (optional)    |
| callbackParameters   | **array**   | Array of parameters to be passed on to the callback method along with the response. (optional)|
| priority   | **number**   | Priority in queue (1 is highest priority) (optional)|

### Example: 
```
var ChessWebAPI = require('chess-web-api');

var chessAPI = new ChessWebAPI({
    queue: true,
});

let printResults = function(response, error, sampleParameter1, sampleParameter2) {
    console.log(response.body);
    console.log(sampleParameter1);
    console.log(sampleParameter2);
}

chessAPI.dispatch(chessAPI.getPlayer, printResults, ["andyruwruw"], {}, 1, ["callbackParameter", "anotherCallbackParameter"]);
chessAPI.dispatch(chessAPI.getTitledPlayers, printResults, ["GM"]);
chessAPI.dispatch(chessAPI.getPlayerCurrentDailyChess, printResults, ["andyruwruw"], ["callbackParameter"]);
chessAPI.dispatch(chessAPI.getPlayerCompleteMonthlyArchives, printResults, ["andyruwruw", 2019, 10], {}, ["callback parameter"]);
```

If you initialize your **ChessWebAPI** with the queue enabled, you can still call any of the regular functions without using the queue.

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
<h1 id="clear-queue">clearQueue()</h1>

Should you wish to clear the queue you can run the following method.

### Example: 

```
var ChessWebAPI = require('chess-web-api');

var chessAPI = new ChessWebAPI({
    queue: true,
});

let printResults = function(response, error) {
    console.log(response.body);
}

chessAPI.dispatch(chessAPI.getPlayer, printResults, ["andyruwruw"], {}, 1, ["callbackParameter", "anotherCallbackParameter"]);

chessAPI.clearQueue();
```

<h1 id="query-doc">Query for Changes</h1>

The Chess.com public data API also allows clients to provide an **etag** from a previous response to check if data since the last request has changed. 

This has been implemented into chess-web-api's **ifChanged** method.

<h1 id="if-changed">
    <a href="https://www.chess.com/news/view/published-data-api#pubapi-general">
        ifChanged(etag, method, parameters, options, callback)
    </a>
</h1>

Allows you to make any of the helper functions with the added parameter of the **etag** provided in the header of the last simular request.

### Parameters
| Name       | Type       | Description                                       |
|------------|------------|---------------------------------------------------|
| etag       | **string**   | ID of last request made. Found in the header.     |
| method     | **function** | **chess-web-api** function for request.             |
| parameters | **array**    | Array of parameters to be passed into the method. |
| options    | **object**   | Added options to the end of the URL (optional)    |
| callback   | **function** | Function to be called with result (optional)      |
### Returns
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
### Example:
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
---
## ENJOY THE WRAPPER
![alt text](https://i.pinimg.com/originals/f6/34/96/f6349647c1537e61dd2f5df68a7b7a92.gif)
### - Andrew Young
