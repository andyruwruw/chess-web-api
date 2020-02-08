# chess-web-api

This is a wrapper for the [Chess.com Published-Data API](https://www.chess.com/news/view/published-data-api). It includes helper functions for **all the endpoints**, such as player profile data, current daily chess, monthly archives, clubs, tournaments and more.

No additional dependencies are used.

Please read their [notes on data currency, language and rate limits on parallel requests](https://www.chess.com/news/view/published-data-api). They're good to know before you implement this into your work.

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

## Installation

Install via node:

    $ npm install -S chess-web-api

Then, in your javascript file
```
var chess-web-api = require('chess-web-api');
```

or by making a copy of the `src/chess-web-api.js` or `src/chess-web-api-queue.js`

## Usage

[Chess.com's API](https://www.chess.com/news/view/published-data-api#game-results) doesn't rate limit unless you've made parallel requests. If you have more than two active requests at a time, you'll recieve a `429 Too Many Requests` error. 

This wrapper has two different usages

