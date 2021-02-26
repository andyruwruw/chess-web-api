# Get a Chess Game by ID

#### Description:

chess-web-api's `getGameByID` method is not an official endpoint of [Chess.com's Published Data API](https://www.chess.com/news/view/published-data-api). Therefore it's subject to break, but unavailable or change.

Please [submit an issue](https://github.com/andyruwruw/chess-web-api/issues) if you notice any strange behavior to improve this documentation or make fixes.

The endpoint was requested by pi0neerpat and jschiarizzi and it's implementation was discussed [here](https://github.com/andyruwruw/chess-web-api/issues/10) and [here](https://github.com/andyruwruw/chess-web-api/issues/11). It utilizes the endpoint the official website uses to show your game.

A PGN was not provided, but a FEN and encrypted move list were.  So `chess.js` was added as a dependency to generate the PGN. Thanks to CoeJoder for implementing it.

#### Returns:

```
{
  "body": {
    "game": {
      "allowVacation": boolean,
      "baseTime1": number,
      "canSendTrophy": boolean,
      "changesPlayersRating": number,
      "colorOfWinner": string,
      "endTime": number,
      "id": number,
      "initialSetup": string,
      "isLiveGame": boolean,
      "isAbortable": boolean,
      "isAnalyzable": boolean,
      "isCheckmate": boolean,
      "isStalemate": boolean,
      "isFinished": boolean,
      "isRated": boolean,
      "isResignable": boolean,
      "lastMove": string, // Number
      "moveList": string, // See implementation github issue
      "moveTimestamps": string, // Comma separated numbers. Examples: '1800,1800,1782,1713,1740'
      "pgn": string, // Example: '[Event "Live Chess"]\n' + '[Site "Chess.com"]\n'...
      "pgnHeaders": {
        "Black": string, // Username
        "BlackElo": number,
        "Date": string, // YYY.MM.DD
        "ECO": string,
        "Event": "Let\'s Play!",
        "FEN": string,
        "Result": string,
        "SetUp": string,
        "Site": "Chess.com",
        "TimeControl": string,
        "White": string,
        "WhiteElo": string,
      },
      "plyCount": number,
      "ratingChangeWhite": number,
      "ratingChangeBlack": number,
      "resultMessage": string, // Example: 'proanalyst won on time'
      "timeIncrement1": 0,
      "turnColor": string,
      "type": string, // Example: 'chess'
      "typeName": string, // Example: 'Standard Chess'
    },
    "players": {
      "top": {
        "avatarUrl": string, // URL
        "canWinOnTime": boolean,
        "color": string,
        "countryId": number,
        "countryName": string,
        "defaultTab": number,
        "flairCode": string,
        "gamesInProgress": number,
        "hasMovedAtLeastOnce": boolean,
        "id": number,
        "isContentHidden": boolean,
        "isDrawable": boolean,
        "isEnabled": boolean,
        "isInLivechess": boolean,
        "isOnline": boolean,
        "isTouchMove": boolean,
        "isVacation": boolean,
        "isWhiteOnBottom": boolean,
        "lastLoginDate": number,
        "location": string,
        "memberSince": number,
        "membershipCode": string,
        "membershipLevel": number,
        "offeredDraw": boolean,
        "postMoveAction": string,
        "rating": number,
        "turnTimeRemaining": string, // Example '3 Days'
        "username": string,
        "vacationRemaining": string, // Example '9 days'
      },
      "bottom": {
        "avatarUrl": string, // URL
        "canWinOnTime": boolean,
        "color": string,
        "countryId": number,
        "countryName": string,
        "defaultTab": number,
        "flairCode": string,
        "gamesInProgress": number,
        "hasMovedAtLeastOnce": boolean,
        "id": number,
        "isContentHidden": boolean,
        "isDrawable": boolean,
        "isEnabled": boolean,
        "isInLivechess": boolean,
        "isOnline": boolean,
        "isTouchMove": boolean,
        "isVacation": boolean,
        "isWhiteOnBottom": boolean,
        "lastLoginDate": number,
        "location": string,
        "memberSince": number,
        "membershipCode": string,
        "membershipLevel": number,
        "offeredDraw": boolean,
        "postMoveAction": string,
        "rating": number,
        "turnTimeRemaining": string, // Example '3 Days'
        "username": string,
        "vacationRemaining": string, // Example '9 days'
      },
    }
  },
  "headers": {
    "date": string,
    "set-cookie": [string], // There are some values here...
    "cache-control": "no-cache, private",
    "x-xss-protection": "1; mode=block",
    "x-chesscom-features": string,
    "x-chesscom-version": string, // Number
    "x-chesscom-matched": string,
    "x-chesscom-request-id-lb": string,
    "x-chesscom-request-id-cdn": string,
  },
  "statusCode": 200
}
```
