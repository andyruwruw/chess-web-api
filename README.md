<div align="center">
    <image width="400" align="center"src="https://raw.githubusercontent.com/andyruwruw/chess-web-api/master/documentation/logo.png"/><br/>
</div>

<p align="center">Lightweight wrapper for the Chess.com Published-Data API</p>

<p align="center" style="margin: 0px auto; margin-top: 15px; max-width: 600px">
    <a href="https://melophile.org"><img src="https://img.shields.io/npm/v/chess-web-api"></a>
    <a href="#"><img src="https://img.shields.io/npm/dt/chess-web-api"/></a>
    <a href="https://melophile.org"><img src="https://img.shields.io/github/issues-raw/andyruwruw/chess-web-api"></a>
</p>

# Overview

chess-web-api is a lightweight unofficial wrapper for the [Chess.com Published-Data API](https://www.chess.com/news/view/published-data-api). 

It includes helper functions for [all the endpoints](#all-functions), such as [player profile data](#get-players-profile), [current daily chess](#get-players-current-daily-chess-games), [monthly archives](#get-players-completed-monthly-archives), [clubs](#get-a-club), [tournaments](#get-a-tournament) and [more](#all-functions).

Please read Chess.com's [notes on data currency, language and rate limits on parallel requests](https://www.chess.com/news/view/published-data-api). They're good to know before you implement this into your work.


I'll try to keep this library updated if they're API changes, feel free to submit any [issues](https://github.com/andyruwruw/chess-web-api/issues).

# Additional Features

## Priority Queue
**chess-web-api** can be inicialized with a [priority queue](#usage-with-queue) for requests to prevent parellel requests. Requests will be sent as soon as the previous returns. 

Using the queue requires passing in a **callback function** for the result to be sent to.

## Query for Changes

[Chess.com Published-Data API](https://www.chess.com/news/view/published-data-api) also allows clients to provide an **etag** from a previous response to check if data since the last request has changed. 

This has been implemented into chess-web-api's [ifChanged function](#query-doc) to make any of the requests.



# Documentation

- [Available Services](#available-services)
- Getting Started
    - [Installation](#installation)
    - [Usage Without Queue](#usage-without-queue)
    - [Usage With Queue](#usage-with-queue)
- [Query for Changes](#query-doc)
- [All Functions](#all-functions)



# Available Services

The wrapper includes functions to retrieve the following: 

### Profile Data
- [Profile](#get-players-profile)
- [Stats](#get-players-statistics)
- [Player online status](#get-players-online-status)
### Player Games
- [Current Daily Chess](#get-players-current-daily-chess-games)
- [Concise To-Move Daily Chess](#get-players-concise-to-move-daily-chess-games)
- [Available Archives](#get-players-available-monthly-archives)
- [Monthly Archives](#get-players-completed-monthly-archives)
- [Multi-Game PGN Download](#get-players-month-multi-game-pgns)
### Player Participation
- [List of Clubs](#get-players-clubs)
- [Team Matches](#get-players-matches)
- [Tournaments](#get-players-tournaments)
### Clubs
- [Club Profile](#get-a-club)
- [List of members, by activity level](#get-a-clubs-members)
- [Team Matches](#get-a-clubs-matches)
### Tournaments
- [Tournament](#get-a-tournament)
- [Tournament Round](#get-a-tournament-round)
- [Tournament Round's Group](#get-a-tournament-rounds-group)
### Team Matches
- [Daily Team Match](#get-a-team-match)
- [Daily Team Match Board](#get-a-team-match-board)
- [Live Team Match](#get-a-live-team-match)
- [Live Team Match Board](#get-a-live-team-match-board)
### Countries
- [Country Profile](#get-a-country)
- [List of Players](#get-a-countrys-players)
- [List of Clubs](#get-a-countrys-clubs)
### Daily Puzzle
- [Daily Puzzle](#get-the-daily-puzzle)
- [Random Daily Puzzle](#get-a-random-puzzle)
### General
- [Streamers](#get-list-of-streamers)
- [Leaderboards](#get-leaderboards)
- [Titled Players](#get-titled-players)



# Installation

Install via node:

    $ npm install -S chess-web-api

Then, in your javascript file
```
var ChessWebAPI = require('chess-web-api');

var chessAPI = new ChessWebAPI();
```
If you wish to use the built in [priority queue](#usage-with-queue) to avoid parallel requests, add the following paramter to the constructor:
```
var chessAPI = new ChessWebAPI({
    queue: true
});
```
---

## Usage (Without Queue)

To use chess-web-api, once you've create an instance of the library, call any of the functions on it.
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

[Chess.com's API](https://www.chess.com/news/view/published-data-api#game-results) doesn't rate limit unless you've made parallel requests. If you have more than two active requests at a time, you'll recieve a **429 Too Many Requests** error. 

To add something to the queue, use the method **dispatch**.
```
.dispatch(method, callback, parameters, options, priority, callbackParameters)
```
### Parameters:

| Name       | Type       | Description                                       |
|------------|------------|---------------------------------------------------|
| method     | **function** | **chess-web-api** function for request.             |
| callback   | **function** | Function to be called with result                 |
| parameters | **array**    | Array of parameters to be passed into the method. |
| options    | **object**   | Added options to the end of the URL (optional)    |
| priority   | **number**   | Priority in queue (1 is heighest priority) (optional)|
| callbackParameters   | **array**   | Array of parameters to be passed on to the callback method along with the response. (optional)|

### Returns: **object**

### Example: 

```
var ChessWebAPI = require('chess-web-api');

var chessAPI = new ChessWebAPI({
    queue: true,
});

let printResults = function(response, sampleParameter1, sampleParameter2) {
    console.log(response.body);
    console.log(sampleParameter1);
    console.log(sampleParameter2);
}

chessAPI.dispatch(chessAPI.getPlayer, printResults, ["andyruwruw"], {}, 1, ["callbackParameter", "anotherCallbackParameter"]);
chessAPI.dispatch(chessAPI.getTitledPlayers, printResults, ["GM"]);
chessAPI.dispatch(chessAPI.getPlayerCurrentDailyChess, printResults, ["andyruwruw"], ["callbackParameter"]);
chessAPI.dispatch(chessAPI.getPlayerCompleteMonthlyArchives, printResults, ["andyruwruw", 2019, 10], {}, ["callback parameter"]);
```

The dispatch function determines the difference between **parameters** to be passed into the **chessAPI method** vs the **callback function** by order. 

The **first array** passed into dispatch will always be passed into the **chessAPI method**. 

The **second array** will always be sent to the **callback function**, with the **response to the request as the first parameter**. See example above.

If you inicialize your **ChessWebAPI** with the queue enabled, you can still call any of the regular functions without using the queue.

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



<h1 id="query-doc">Query for Changes</h1>

```
.ifChanged(etag, method, parameters, options, callback)
```

### Parameters:

| Name       | Type       | Description                                       |
|------------|------------|---------------------------------------------------|
| etag       | **string**   | ID of last request made. Found in the header.     |
| method     | **function** | **chess-web-api** function for request.             |
| parameters | **array**    | Array of parameters to be passed into the method. |
| options    | **object**   | Added options to the end of the URL (optional)    |
| callback   | **function** | Function to be called with result (optional)      |

### Returns: **Object**

**ifChanged** allows you to make any of the helper functions with the added parameter of the **etag** provided in the header of the last simular request.

ifChanged will return either of the following:

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


# All Functions

**All descriptions / results were copied from [here](https://www.chess.com/news/view/published-data-api). It's here for ease of access only. Please go to the site to ensure the return values have not been changed.**

---
## Get Player's Profile
```
.getPlayer(username, options, callback)
```

### Description: 
*Get additional details about a player in a game.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns:
```
{
    body: {
        @id: "URL", // the location of this profile (always self-referencing)
        url: "URL", // the chess.com user's profile page (the username is displayed with the original letter case)
        username: "string", // the username of this player
        player_id: 41, // the non-changing Chess.com ID of this player
        title: "string", // (optional) abbreviation of chess title, if any
        status: "string", // account status: closed, closed:fair_play_violations, basic, premium, mod, staff
        name: "string", // (optional) the personal first and last name
        avatar: "URL", // (optional) URL of a 200x200 image
        location: "string", // (optional) the city or location
        country: "URL", // API location of this player's country's profile
        joined: 1178556600, // timestamp of registration on Chess.com
        last_online: 1500661803, // timestamp of the most recent login
        followers: 17 // the number of players tracking this player's activity
        is_streamer: "boolean", //if the member is a Chess.com streamer
        twitch_url: "Twitch.tv URL",
        fide: "integer" // FIDE rating
    }
}
```
---

## Get Player's Statistics

```
.getPlayerStats(username, options, callback)
```
### Description: 
*Get ratings, win/loss, and other stats about a player's game play, tactics, lessons and Puzzle Rush score.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        chess_daily: {
            /* stats object for games of rules "chess" and "daily" time-class */
        },
        chess960_daily: {
            /* stats object for games of rules "chess960" and "daily" time-class */
        },
        chess_blitz: {
            /* stats object for games of rules "chess" and "blitz" time-class */
        },
        tactic: {
            highest: {
                rating: "integer",
                date: "timestamp"
            },
            lowest: {
                rating: "integer",
                date: "timestamp"
            }
        },
        lessons:{
            highest: {
                rating: "integer",
                date: "timestamp"
            },
            lowest: {
                rating: "integer",
                date: "timestamp"
            }
        },
        puzzle_rush: {
            daily:{ 
                total_attempts: "integer",
                score: "integer"
            },
            best: {
                total_attempts: "integer",
                score: "integer"
            }
        }
    }
}
```
---

## Get Player's Online Status

```
.getPlayerOnline(username, options, callback)
```
### Description: 
*Tells if an user has been online in the last five minutes.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        online: boolean, //true or false
    }
}
```
---
## Get Player's Current Daily Chess Games

```
.getPlayerCurrentDailyChess(username, options, callback)
```
### Description: 
*Array of Daily Chess games that a player is currently playing.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        games: [
            {
                white: "string", // URL of the white player's profile
                black: "string", // URL of the black player's profile
                url: "string", // URL of this game
                fen: "string", // current FEN
                pgn: "string", // current PGN
                turn: "black", // player to move
                move_by: 1501765498, // timestamp of when the next move must be made
                vacation: 0, // this is "0" if the player-to-move is on vacation
                draw_offer: "black", // (optional) player who has made a draw offer
                last_activity: 1509810789, // timestamp of the last activity on the game
                start_time: 1254438881, // timestamp of the game start (Daily Chess only)
                time_control: "string", // PGN-compliant time control
                time_class: "string", // time-per-move grouping, used for ratings
                rules: "string", // game variant information (e.g., "chess960")      
                tournament: "string", //URL pointing to tournament (if available),  
                match: "string" //URL pointing to team match (if available)
            }
        ]
    }
}
```
---
## Get Player's Concise To-Move Daily Chess Games
```
.getPlayerToMoveDailyChess(username, options, callback)
```
### Description: 
*Array of Daily Chess games where it is the player's turn to act.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        games: [
            {
                url: "string", // URL of this game
                move_by: 1254438881, // timestamp of the when the move must be made by
                                        // this is "0" if it is not this player's turn
                draw_offer: true, // (optional) this player has received a draw offer
                last_activity: 1509810789, // timestamp of the last activity on the game
            }
        ]
    }
}
```
---
## Get Player's Available Monthly Archives
```
.getPlayerMonthlyArchives(username, options, callback)
```
### Description: 
*Array of monthly archives available for this player.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        archives: [
            /* array of URLs for monthly archives in ascending chronological order */
        ]
    }
}
```
---
## Get Player's Completed Monthly Archives
```
.getPlayerCompleteMonthlyArchives(username, year, month, options, callback)
```
### Description: 
*Array of Live and Daily Chess games that a player has finished.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| year | **string | number**   | Year of matches.                   |
| month | **string | number**   | Month of matches.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        white: { // details of the white-piece player:
            username: "string", // the username
            rating: 1492, // the player's rating at the start of the game
            result: "string", // see "Game results codes" section
            @id: "string", // URL of this player's profile
        },
        black: { // details of the black-piece player:
            username: "string", // the username
            rating: 1942, // the player's rating at the start of the game
            result: "string", // see "Game results codes" section
            @id: "string", // URL of this player's profile
        },
        url: "string", // URL of this game
        fen: "string", // final FEN
        pgn: "string", // final PGN
        start_time: 1254438881, // timestamp of the game start (Daily Chess only)
        end_time: 1254670734, // timestamp of the game end
        time_control: "string", // PGN-compliant time control
        rules: "string", // game variant information (e.g., "chess960")
        eco: "string", //URL pointing to ECO opening (if available),
        tournament: "string", //URL pointing to tournament (if available),  
        match: "string", //URL pointing to team match (if available)  
    }
}
```
---
## Get Player's Month Multi Game PGNs
```
.getPlayerMultiGamePGN(username, year, month, options, callback)
```
### Description: 
*Standard multi-game format PGN containing all games for a month.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| year | **string | number**   | Year of matches.                   |
| month | **string | number**   | Month of matches.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        clubs: [
            {  
                @id: url, // URL of Club endpoint
                name: string, // Club's name
                last_activity: timestamp, //timestamp of last activity
                icon: url, // Club's icon url 
                url: url, // Club's url
                joined: timestamp  // Timestamp of when player joined the Club
            }
        ]
    }
}
```

---
## Get Player's Clubs
```
.getPlayerClubs(username, options, callback)
```
### Description: 
*List of clubs the player is a member of, with joined date and last activity date.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        clubs: [
            {  
                @id: url, // URL of Club endpoint
                name: string, // Club's name
                last_activity: timestamp, //timestamp of last activity
                icon: url, // Club's icon url 
                url: url, // Club's url
                joined: timestamp  // Timestamp of when player joined the Club
            }
        ]
    }
}
```
---
## Get Player's Matches
```
.getPlayerMatches(username, options, callback)
```
### Description: 
*List of Team matches the player has attended, is partecipating or is currently registered.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        finished: [ // List of matches
            {
                name: "Name of match",
                url: "URL", // URL of match on web site
                @id: "URL", // URL of PubAPI match endpoint
                club: "URL", // URL of player's club endpoint
                results: [
                    played_as_white: "win", //result of game played as white, see "Game results codes" section
                    played_as_black: "win" //result of game played as black, see "Game results codes" section
                ],
                board: "URL", // URL of PubAPI match board endpoint
            } 
        ],
        in_progress: [ // List of matches
            {
                name: "Name of match",
                url: "URL", // URL of match on web site
                @id: "URL", // URL of PubAPI match endpoint
                club: "URL", // URL of player's club endpoint
                board: "URL", // URL of PubAPI match board endpoint
            } 
        ],
        registered: [ // List of matches
            {
                name: "Name of match",
                url: "URL", // URL of match on web site
                @id: "URL", // URL of PubAPI match endpoint
                club: "URL", // URL of player's club endpoint
            } 
        ]
    }
}
```
---
## Get Player's Tournaments
```
.getPlayerTournaments(username, options, callback)
```
### Description: 
*List of tournaments the player is registered, is attending or has attended in the past.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| username | **string**   | Username of desired profile.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        finished: [
            {
                url: "URL", // link to the PubAPI URL of the tournament
                @id: "URL", // link to the Web URL of the tournament
                wins: 3, //number of wins
                losses: 5, //number of losses
                draws: 0, //number of draws
                points_awarded: 0, //pints awarded
                placement: 4, //placement
                status: "eliminated", //final status of the player in this tourmanent {winner, eliminated, withdrew, removed}
                total_players: 5 //number of total players
            } /* array of finished tournaments */
        ],
        in_progress: [
            {
                url: "URL", // link to the PubAPI URL of the tournament
                @id: "URL", // link to the Web URL of the tournament
                status: "eliminated", //final status of the player in this tourmanent {winner, eliminated, withdrew, removed}
            } /* array of in progress tournaments */
        ],
        registered: [
            {
                url: "URL", // link to the PubAPI URL of the tournament
                @id: "URL", // link to the Web URL of the tournament
                status: "invited" //current status of user {invited, registered}
            } /* array of registered tournaments */
        ]
    }
}
```
---
## Get a Club 
```
.getClub(urlID, options, callback)
```
### Description: 
*Get additional details about a club.*

*All club-based URLs use the club's "URL ID" to specify which club you want data for.*

*The url-ID is the same as found in the URL for the club's web page on www.chess.com. For example, the url-ID of the Chess.com Developer's Club is chess-com-developer-community.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| urlID | **string**   | Club's unique urlID                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        @id: "URL", // the location of this profile (always self-referencing)
        name: "string", // the human-readable name of this club
        club_id: 57796, // the non-changing Chess.com ID of this club
        icon: "URL", // (optional) URL of a 200x200 image
        country: "URL", // location of this club's country profile
        average_daily_rating: 1376, //average daily rating
        members_count: 54 //total members count
        created: 1178556600, // timestamp of creation on Chess.com
        last_activity: 1500661803, // timestamp of the most recent post, match, etc
        visibility: "public", // whether the club is public or private
        join_request: "URL", // location to submit a request to join this club
        admin: [
            /* array of URLs to the player profiles for the admins of this club */
        ],
        description: "string" // text description of the club
    }
}
```
---
## Get a Club's Members
```
.getClubMembers(urlID, options, callback)
```
### Description: 
*List of club members (usernames and joined date timestamp), grouped by club-activity frequency. The club-activity is one of this actions:*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| urlID | **string**   | Club's unique urlID                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        weekly: [
            {
                username: "string", //username
                joined: "integer",  //timestamp
            }
        ],
        monthly: [
            {
                username: "string", //username
                joined: "integer",  //timestamp
            }
        ],
        all_time: [
            {
                username: "string", //username
                joined: "integer",  //timestamp
            }
        ]
    }
}
```
---
## Get a Club's Matches
```
.getClubMatches(urlID, options, callback)
```
### Description: 
*List of daily and club matches, grouped by status (registered, in progress, finished).*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| urlID | **string**   | Club's unique urlID                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        finished: [ //List of matches
            {
                name: "match name", //the team match name
                @id: "URL", // URL pointing to the team match endpoint
                opponent: "https://api.chess-dev.com/pub/club/testing-teams", // URL pointing to the opponent club endpoint
                result: "win" // see "Game results codes" section
            }
        ],
        in_progress: [ //List of matches
            {
                name: "match name", //the team match name
                @id: "URL", // URL pointing to the team match endpoint
                opponent: "https://api.chess-dev.com/pub/club/testing-teams", // URL pointing to the opponent club endpoint
            }
        ],
        registered: [ //List of matches
            {
                name: "match name", //the team match name
                @id: "URL", // URL pointing to the team match endpoint
                opponent: "https://api.chess-dev.com/pub/club/testing-teams", // URL pointing to the opponent club endpoint
            }
        ]
    }
}
```
---
## Get a Tournament
```
.getTournament(urlID, options, callback)
```
### Description: 
*Get details about a daily, live and arena tournament.*

*All tournaments-based URLs use the tournament's "URL ID" to specify which tournament you want data for.*

*The url-ID is the same as found in the URL for the tournament's web page on www.chess.com. For example, the url-ID of the Chess.com Developer's Club is -33rd-chesscom-quick-knockouts-1401-1600*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| urlID | **string**   | Tournaments's unique urlID                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        name: "name",
        url: "URL", //url to Web tournament's URL
        description: "description", 
        creator: "username", //username of creator
        status: "finished", //status of tournament {finished, in_progress, registration}
        finish_time: 1251846528, //timestamp of finish time, if tournament is finished
        settings: {
            type: "round_robin",
            rules: "string", // game variant information (e.g., "chess960")
            time_class: "daily",
            time_control: "1/259200",
            is_rated: true,
            is_official: false,
            is_invite_only: false,
            initial_group_size: 5,
            user_advance_count: 1,
            use_tiebreak: true,
            allow_vacation: false,
            winner_places: 1,
            registered_user_count: 5,
            games_per_opponent: 2,
            total_rounds: 1,
            concurrent_games_per_opponent: 1
        },
        players: [
            /** List of tournament's rounds URL */
            {
                username: "username", 
                status: "eliminated" //status of user
            }
        ],
        rounds: [
            /** List of tournament's rounds URL */
        ]
    }
}
```
---
## Get a Tournament Round
```
.getTournamentRound(urlID, round, options, callback)
```
### Description: 
*Get details about a tournament's round.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| urlID | **string**   | Tournaments's unique urlID                   |
| round | **string | number**   | Round number                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        groups: 
            // List of tournament's round groups
        ],
        players: [ // List of tournament's round players 
            {
                username: "username",
                is_advancing:false // {true, false}, only if this tournament is completed 
            }
        ]
    }
}
```
---
## Get a Tournament Round's Group
```
.getTournamentRoundGroup(urlID, round, group, options, callback)
```
### Description: 
*Get details about a tournament's round group.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| urlID | **string**   | Tournaments's unique urlID                   |
| round | **string | number**   | Round number                   |
| group | **string | number**   | Group number                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        fair_play_removals: [ 
            // List of username accounts closed for fair play violation
        ],
        games: [ // List of group's games 
            {
                white: "string", // URL of the white player's profile
                black: "string", // URL of the black player's profile
                url: "string", // URL of this game
                fen: "string", // current FEN
                pgn: "string", // current PGN
                turn: "black", // player to move
                move_by: 1501765498, // timestamp of when the next move must be made
                vacation: "number" // this is "0" if the player-to-move is on vacation
                draw_offer: "black", // (optional) player who has made a draw offer
                last_activity: 1509810789, // timestamp of the last activity on the game
                start_time: 1254438881, // timestamp of the game start (Daily Chess only)
                time_control: "string", // PGN-compliant time control
                time_class: "string", // time-per-move grouping, used for ratings
                rules: "string", // game variant information (e.g., "chess960")
                eco: "string", //URL pointing to ECO opening (if available),
                tournament: "string", //URL pointing to tournament (if available)  
            }
        ],
        players: [ // List of group's players
            {
                username: "username",
                points: 2, //points earned by player in this group adjuested in case of fair play recalculations)
                tie_break: 6, //tie-break points by player earned in this group
                is_advancing: false // {true, false}
            }
        ]
    }
}
```
---
## Get a Team Match
```
.getTeamMatch(id, options, callback)
```
### Description: 
*Get details about a team match and players playing that match. After the match is finished there will be a link to each player's stats endpoint, in order to get up-to-date information about the player.*

*All team matches-based URLs use the match "ID" to specify which match you want data for.*

*The ID is the same as found in the URL for the team match web page on www.chess.com. For example, the ID WORLD LEAGUE Round 5: Romania vs USA Southwest is 12803.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| id | **string | number**   | Id of desired team match.                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
// REGISTRATION PHASE: 

{
    body: {
        name: string, 
        url: "URL", // the URL of the match on the website
        description: string, // description
        start_time" : timestamp, //manual or auto time start
        settings:{  
        time_class: "daily", // only daily matches are supported for now
        time_control: string, // time control
        initial_setup: ,
        rules: string, // game variant information (e.g., "chess960")
        min_team_players: integer, //minimum number of players per team
        max_team_players: integer, //maximum number of players per team
        min_required_games: integer, //minimum number of required games
        min_rating: integer, //minimum rating of players to be admitted in this match
        max_rating: integer, //maximum rating of players to be admitted in this match
        autostart: boolean //if the match is set to automatically start
        },
        status: "registration", 
        boards: integer, // number of boards
        teams: {
            team1: {
                @id: "URL", // API URL for the club profile
                url: "URL", // Web URL for the club profile
                name: "string", // club name
                score: score, // Team score (adjuested in case of fair play recalculations)
                players: [
                    {
                        username: "username", 
                        board: "url", // url of board
                        rating: 1355, //rating of player
                        rd: 25.12, //Glicko RD
                        timeout_percent: 25.12, //timeout percentage in the last 90 days
                        status: "basic" //status of user
                    }
                ]
            },
            team2: {
                @id: "URL", // API URL for the club profile
                url: "URL", // Web URL for the club profile
                name: "string", // club name
                score: score, // Team score (adjuested in case of fair play recalculations)
                players: [
                    {
                        username: "username", 
                        board: "url", // url of board
                        rating: 1355, //rating of player
                        timeout_percent: 25.21, //timeout percentage in the last 90 days
                        status: "basic" //status of user
                    }
                ]
            }
        }   
    }
}

// IN PROGRESS / FINISHED:
{
    body {
        name: string, 
        url: "URL", // the URL of the match on the website
        description: string, // description
        start_time" : timestamp, //manual or auto time start 
        settings:{  
        time_class: "string", // time-per-move grouping, used for ratings
        time_control: string, // time control
        rules: string, // game variant information (e.g., "chess960")
        min_team_players:0, //minimum number of players per team
        max_team_players:0, //maximum number of players per team
        min_required_games:0, //minimum number of required games
        autostart:false
        },
        status: string, // {finished, in_progress},
        boards: integer, // number of boards
        teams: {
            team1: {
                @id: "URL", // API URL for the club profile
                name: "string", // club name
                score: score, // Team score (adjuested in case of fair play recalculations)
                players: [
                    {
                        username: "username", 
                        board: "url", // url of board
                        stats: "url", //url to player's stats 
                        played_as_white: "string", //result {win, lose, resign, etc.} of player when played as white (if game's finished)
                        played_as_black: "string"  //result {win, lose, resign, etc.} of player when played as black (if game's finished)
                    }
                ],
                fair_play_removals: [
                //list of usernames that were closed during match
                ]
            },
            team2: {
                @id: "URL", // API URL for the club profile
                name: "string", // club name
                score: score, // Team score (adjuested in case of fair play recalculations)
                players: [
                    {
                        username: "username",
                        board: "url", // url of board
                        stats: "url", //url to player's stats 
                        played_as_white: "string", //result {win, lose, resign, etc.} of player when played as white (if game's finished)
                        played_as_black: "string"  //result {win, lose, resign, etc.} of player when played as black (if game's finished)
                    }
                ],
                fair_play_removals: [
                //list of usernames that were closed during match
                ]
            }
        }   
    }
}
```
---
## Get a Team Match Board
```
.getTeamMatchBoard(id, board, options, callback)
```
### Description: 
*Get details about a team match board. Only in-progress or finished games will be included, so there may be one or two games in this list.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| id | **string | number**   | Id of desired team match.                   |
| board | **string | number**   | Board identifier                  |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        board_scores:{
        player1: 0.5, // User score (adjuested in case of fair play recalculations)
        player2: 1.5 // User score (adjuested in case of fair play recalculations)
        },
        games: [
            {
                white: { // details of the white-piece player:
                username: "string", // the username
                rating: 1492, // the player's rating at the start of the game
                result: "string", // if game's finished, see "Game results codes" section
                @id: "string", // URL of this player's profile
                team: "url" // url to club's profile
                },
                black: { // details of the black-piece player:
                    username: "string", // the username
                    rating: 1942, // the player's rating at the start of the game
                    result: "string", // if game's finished, see "Game results codes" section
                    @id: "string", // URL of this player's profile
                    team: "url" // url to club's profile
                },
                url: "string", // URL of this game
                fen: "string", // current FEN
                pgn: "string", // final PGN, if game's finished
                start_time: 1254438881, // timestamp of the game start (Daily Chess only)
                end_time: 1254670734, // timestamp of the game end, if game's finished
                time_control: "string", // PGN-compliant time control
                time_class: "string", // time-per-move grouping, used for ratings
                rules: "string", // game variant information (e.g., "chess960")
                eco: "string", //URL pointing to ECO opening (if available),
                match: "string", //URL pointing to team match (if available)  
            }
        ]
    }
}
```
---
## Get a Live Team Match
```
.getTeamLiveMatch(id, options, callback)
```
### Description: 
*Get details about a team match and players playing that match. After the match is finished there will be a link to each player's stats endpoint, in order to get up-to-date information about the player.*

*All live team matches-based URLs use the match "ID" to specify which match you want data for.*

*The ID is the same as found in the URL for the team match web page on www.chess.com. For example, the ID Friendly 5+2 is 5833.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| id | **string | number**   | Id of desired live team match.                  |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
// WHEN SCHEDULED:
{
    body: {
        @id:"https://api.chess.com/pub/match/live/5861",
        name:"Friendly 10|2 Rapid Open: Srbija Tim vs Team USA Live",
        url:"https://www.chess.com/club/matches/live/5861",
        start_time:1579988425,
        status:"scheduled",
        boards:0,
        settings:{
            rules:"chess",
            time_class:"standard",
            time_control:600,
            time_increment:2,
            min_team_players:1,
            min_required_games:0,
            autostart:false
        },
        teams:{
            team1:{
                @id:"https://api.chess.com/pub/club/srbija-tim",
                name:"Srbija Tim",
                url:"https://www.chess.com/club/srbija-tim",
                score:0,
                players: [

                ],
                fair_play_removals: [

                ]
            },
            team2:{
                @id:"https://api.chess.com/pub/club/team-usa-live",
                name:"Team USA Live",
                url:"https://www.chess.com/club/team-usa-live",
                score:0,
                players: [

                ],
                fair_play_removals: [

                ]
            }
        }
    }
}

// WHEN FINISHED
{
    body: {
        @id:"https://api.chess.com/pub/match/live/5833",
        name:"Friendly 5+2",
        url:"https://www.chess.com/club/matches/live/5833",
        start_time:1579471260,
        end_time:1579472487,
        status:"finished",
        boards:6,
        settings:{
            rules:"chess",
            time_class:"blitz",
            time_control:300,
            time_increment:2,
            min_team_players:2,
            min_required_games:0,
            autostart:false
        },
        teams:{
            team1:{
                @id:"https://api.chess.com/pub/club/lynx-club",
                name:"Lynx Club",
                url:"https://www.chess.com/club/lynx-club",
                score:7,
                result:"win",
                players: [
                    {
                    username:"guilhermekk",
                    stats:"https://api.chess.com/pub/player/guilhermekk/stats",
                    status:"premium",
                    played_as_white:"win",
                    played_as_black:"resigned",
                    board:"https://api.chess.com/pub/match/5833/4"
                    },
                    {
                    username:"insan3_7",
                    stats:"https://api.chess.com/pub/player/insan3_7/stats",
                    status:"premium",
                    played_as_black:"checkmated",
                    played_as_white:"win",
                    board:"https://api.chess.com/pub/match/5833/1"
                    },
                    {
                    username:"jydra21",
                    stats:"https://api.chess.com/pub/player/jydra21/stats",
                    status:"basic",
                    played_as_black:"checkmated",
                    played_as_white:"insufficient",
                    board:"https://api.chess.com/pub/match/5833/5"
                    },
                    {
                    username:"luisen_17",
                    stats:"https://api.chess.com/pub/player/luisen_17/stats",
                    status:"basic",
                    played_as_white:"win",
                    played_as_black:"win",
                    board:"https://api.chess.com/pub/match/5833/2"
                    },
                    {
                    username:"over_9000_aka_max",
                    stats:"https://api.chess.com/pub/player/over_9000_aka_max/stats",
                    status:"premium",
                    played_as_white:"win",
                    played_as_black:"win",
                    board:"https://api.chess.com/pub/match/5833/6"
                    },
                    {
                    username:"rahara1988",
                    stats:"https://api.chess.com/pub/player/rahara1988/stats",
                    status:"premium",
                    played_as_black:"checkmated",
                    played_as_white:"agreed",
                    board:"https://api.chess.com/pub/match/5833/3"
                    }
                ],
                fair_play_removals: [

                ]
            },
            team2:{
                @id:"https://api.chess.com/pub/club/not-so-pro-chess-league",
                name:"Not-So PRO Chess League",
                url:"https://www.chess.com/club/not-so-pro-chess-league",
                score:5,
                result:"lose",
                players: [
                    {
                    username:"25elevin",
                    stats:"https://api.chess.com/pub/player/25elevin/stats",
                    status:"premium",
                    played_as_black:"timeout",
                    played_as_white:"timeout",
                    board:"https://api.chess.com/pub/match/5833/2"
                    },
                    {
                    username:"alexkotow",
                    stats:"https://api.chess.com/pub/player/alexkotow/stats",
                    status:"basic",
                    played_as_black:"resigned",
                    played_as_white:"resigned",
                    board:"https://api.chess.com/pub/match/5833/6"
                    },
                    {
                    username:"checkmatemark04",
                    stats:"https://api.chess.com/pub/player/checkmatemark04/stats",
                    status:"basic",
                    played_as_white:"win",
                    played_as_black:"agreed",
                    board:"https://api.chess.com/pub/match/5833/3"
                    },
                    {
                    username:"sougataghosh",
                    stats:"https://api.chess.com/pub/player/sougataghosh/stats",
                    status:"premium",
                    played_as_white:"win",
                    played_as_black:"checkmated",
                    board:"https://api.chess.com/pub/match/5833/1"
                    },
                    {
                    username:"stompall",
                    stats:"https://api.chess.com/pub/player/stompall/stats",
                    status:"premium",
                    played_as_white:"win",
                    played_as_black:"insufficient",
                    board:"https://api.chess.com/pub/match/5833/5"
                    },
                    {
                    username:"vicountvonjames",
                    stats:"https://api.chess.com/pub/player/vicountvonjames/stats",
                    status:"basic",
                    played_as_black:"checkmated",
                    played_as_white:"win",
                    board:"https://api.chess.com/pub/match/5833/4"
                    }
                ],
                fair_play_removals: [

                ]
            }
        }
    }
}
```
---
## Get a Live Team Match Board
```
.getTeamLiveMatchBoard(id, board, options, callback)
```
### Description: 
*Get details about a team match board. Only in-progress or finished games will be included, so there may be one or two games in this list.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| id | **string | number**   | Id of desired live team match.                  |
| board | **string | number**   | Board identifier                  |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        board_scores:{
            stompall:1.5, // User score (adjuested in case of fair play recalculations)
            jydra21:0.5 // User score (adjuested in case of fair play recalculations)
        },
        games: [
            {
                url:"https://www.chess.com/live/game/4415534343",
                pgn:"PGN of the game",
                time_control:"300+2",
                end_time:1579471691,
                rated:true,
                fen:"r7/p4pN1/1pn4k/8/2bP3R/2P3R1/6PP/6K1 b - -",
                time_class:"blitz",
                rules:"chess",
                white:{
                    rating:1351,
                    result:"win",
                    @id:"https://api.chess.com/pub/player/stompall",
                    username:"stompall"
                },
                black:{
                    rating:1458,
                    result:"checkmated",
                    @id:"https://api.chess.com/pub/player/jydra21",
                    username:"JYDRA21"
                },
                eco:"https://www.chess.com/openings/Kings-Gambit-Accepted-Modern-Defense-4.exd5"
            },
            {
                url:"https://www.chess.com/live/game/4415552847",
                pgn:"Pgn of the game",
                time_control:"300+2",
                end_time:1579472482,
                rated:true,
                fen:"8/8/2k2K2/8/8/8/8/8 b - -",
                time_class:"blitz",
                rules:"chess",
                white:{
                    rating:1456,
                    result:"insufficient",
                    @id:"https://api.chess.com/pub/player/jydra21",
                    username:"JYDRA21"
                },
                black:{
                    rating:1353,
                    result:"insufficient",
                    @id:"https://api.chess.com/pub/player/stompall",
                    username:"stompall"
                },
                eco:"https://www.chess.com/openings/Scotch-Game-Schmidt-Variation-5.Nxc6-bxc6"
            }
        ]
    }
}
```
---
## Get a Country
```
.getCountry(iso, options, callback)
```
### Description: 
*Get additional details about a country.*

*All country-based URLs use the country's 2-character ISO 3166 code (capitalized) to specify which country you want data for.*

*Find their [code's here](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).*

*Additional countries not listed on that official list have been posted by [Chess.com](https://www.chess.com/news/view/published-data-api) (scroll down to this endpoint).*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| iso | **string**   | Country's ISO identifier                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        @id: "URL", // the location of this profile (always self-referencing)
        name: "string", // the human-readable name of this country
        code: "string" // the ISO-3166-1 2-character code
    }
}
```
---
## Get a Country's Players
```
.getCountryPlayers(iso, options, callback)
```
### Description: 
*List of usernames for players who identify themselves as being in this country.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| iso | **string**   | Country's ISO identifier                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        players: [
            // array of usernames for recently active players in this country
        ]
    }
}
```
---
## Get a Country's Clubs
```
.getCountryClubs(iso, options, callback)
```
### Description: 
*List of URLs for clubs identified as being in or associated with this country.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| iso | **string**   | Country's ISO identifier                   |
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        clubs: [
            // array of profile URLs for clubs in this country
        ]
    }
}
```
---
## Get the Daily Puzzle
```
.getDailyPuzzle(options, callback)
```
### Description: 
*Information about the daily puzzle found in [www.chess.com](www.chess.com).*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        title: "title", //the title of the daily puzzle
        url: "URL", //url to daily puzzle in chess.com
        publish_time: 1513584000, //the date of the published puzzle
        fen: "FEN", //the FEN of the published puzzle
        pgn: "PGN", //the PGN of the published puzzle
        image:"the link to the image"
    }
}
```
---
## Get a Random Puzzle
```
.getDailyPuzzleRandom(options, callback)
```
### Description: 
*Information about a randomly picked daily puzzle.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        title: "title", //the title of the daily puzzle
        url: "URL", //url to daily puzzle in chess.com
        publish_time: 1513584000, //the date of the published puzzle
        fen: "FEN", //the FEN of the published puzzle
        pgn: "PGN", //the PGN of the published puzzle
        image:"the link to the image"
    }
}
```
---
## Get List of Streamers
```
.getStreamers(options, callback)
```
### Description: 
*Information about Chess.com streamers.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        streamers: [
            {
                username: "string",
                avatar: "URL",
                twitch_url: "Twitch.tv URL",
                url:"member url's"
            }
        ]
    }
}
```
---
## Get Leaderboards
```
.getLeaderboards(options, callback)
```
### Description: 
*It displays information about top 50 player for daily and live games, tactics and lessons.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        daily: [
            {
                player_id: "integer",
                @id: "URL",
                url: "URL",
                username: "string",
                score: "integer",
                rank: "integer" /* [1..50] */
            },
            [...]
        ],
        daily960: [
            {
                player_id: "integer",
                @id: "URL",
                url: "URL",
                username: "string",
                score: "integer",
                rank: "integer" /* [1..50] */
            },
            [...]
        ],
        live_rapid: [
            {
                player_id: "integer",
                @id: "URL",
                url: "URL",
                username: "string",
                score: "integer",
                rank: "integer" /* [1..50] */
            },
            [...]
        ],
        live_blitz: [
            {
                player_id: "integer",
                @id: "URL",
                url: "URL",
                username: "string",
                score: "integer",
                rank: "integer" /* [1..50] */
            },
            [...]
        ],
        live_bullet: [
            {
                player_id: "integer",
                @id: "URL",
                url: "URL",
                username: "string",
                score: "integer",
                rank: "integer" /* [1..50] */
            },
            [...]
        ],
        live_bughouse: [
            {
                player_id: "integer",
                @id: "URL",
                url: "URL",
                username: "string",
                score: "integer",
                rank: "integer" /* [1..50] */
            },
            [...]
        ],
        live_blitz960: [
            {
                player_id: "integer",
                @id: "URL",
                url: "URL",
                username: "string",
                score: "integer",
                rank: "integer" /* [1..50] */
            },
            [...]
        ],
        live_threecheck: [
            {
                player_id: "integer",
                @id: "URL",
                url: "URL",
                username: "string",
                score: "integer",
                rank: "integer" /* [1..50] */
            },
            [...]
        ],
        live_crazyhouse: [
            {
                player_id: "integer",
                @id: "URL",
                url: "URL",
                username: "string",
                score: "integer",
                rank: "integer" /* [1..50] */
            },
            [...]
        ],
        live_kingofthehill: [
            {
                player_id: "integer",
                @id: "URL",
                url: "URL",
                username: "string",
                score: "integer",
                rank: "integer" /* [1..50] */
            },
            [...]
        ],
        lessons: [
            {
                player_id: "integer",
                @id: "URL",
                url: "URL",
                username: "string",
                score: "integer",
                rank: "integer" /* [1..50] */
            },
            [...]
        ],
        tactics: [
            {
                player_id: "integer",
                @id: "URL",
                url: "URL",
                username: "string",
                score: "integer",
                rank: "integer" /* [1..50] */
            }, 
            [...]
        ]
    }
}
```
---
## Get Titled Players
```
.getTitledPlayers(titleAbbrev, options, callback)
```
### Description: 
*Retrieves an array of usernames of players with a given title.*

*Valid title abbreviations are: GM, WGM, IM, WIM, FM, WFM, NM, WNM, CM, WCM.*

### Parameters:

| Name     | Type       | Description                                    |
|----------|------------|------------------------------------------------|
| titleAbbrev | **string**   | GM, WGM, IM, WIM, FM, WFM, NM, WNM, CM, WCM.|
| options  | **object**   | Added options to the end of the URL (optional) |
| callback | **function** | Function to be called with result (optional)   |

### Returns
```
{
    body: {
        players: [
            // array of usernames for players with this title
        ]
    }
}
  
```
---


## ENJOY THE WRAPPER
![alt text](https://i.pinimg.com/originals/f6/34/96/f6349647c1537e61dd2f5df68a7b7a92.gif)
### - Andrew Young
