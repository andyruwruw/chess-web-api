declare namespace Helpers {
  type ResponseData<T, U = {}> = Promise<{
    body: T;
    headers?: U;
    statusCode?: number;
  }>;

  type RequestFunctionDefaultParams = [options?: object, callback?: () => any];

  type RequestFunction<
    T extends readonly any[] = any[],
    U = object,
    R = object
  > = (...args: T) => Promise<ResponseData<U, R>>;
}

declare module "chess-web-api" {
  export type NormalChessStats = {
    last: { rating: number; date: number; rd: number };
    best: {
      rating: number;
      date: number;
      game: string;
    };
    record: {
      win: number;
      loss: number;
      draw: number;
    };
  };

  export type PlayerColor = "black" | "white";

  export type GameResultCode =
    | "win"
    | "checkmated"
    | "agreed"
    | "repetition"
    | "timeout"
    | "resigned"
    | "stalemate"
    | "lose"
    | "insufficient"
    | "50move"
    | "abandoned"
    | "kingofthehill"
    | "threecheck"
    | "timevsinsufficient"
    | "bughousepartnerlose";

  export type MatchPlayer = {
    username: string;
    rating: 1492;
    result: GameResultCode;
    "@id": string;
  };

  export type Match = {
    name: string;
    url: string;
    "@id": string;
    club: string;
  };

  export type MatchInProgress = Match & {
    board: string;
  };

  export type FinishedMatch = MatchInProgress & {
    results: {
      played_as_white: GameResultCode;
      played_as_black: GameResultCode;
    };
  };

  export type PlayerTournamentStatus =
    | "winner"
    | "eliminated"
    | "withdrew"
    | "removed";

  export type PlayerTournament = {
    url: string;
    "@id": string;
    status: PlayerTournamentStatus;
  };

  export type FinishedPlayerTournament = PlayerTournament & {
    wins: number;
    losses: number;
    draws: number;
    points_awarded: number;
    placement: number;
  };

  export type ClubMatch = {
    name: string;
    "@id": string;
    opponent: string;
    time_class: string;
  };

  export type ClubMatchInProgress = ClubMatch & {
    start_time: number;
  };

  export type FinishedClubMatch = ClubMatchInProgress & {
    result: GameResultCode;
  };

  export type TeamMatchTeam = {
    "@id": string;
    url: string;
    name: string;
    score: number;
    result: string;
    players: {
      username: string;
      stats: string;
      status: "basic" | "premium";
      played_as_white: GameResultCode;
      played_as_black: GameResultCode;
      board: string;
    }[];
  };

  export type LeaderboardPlayer = {
    player_id: number;
    "@id": string;
    url: string;
    username: string;
    score: number;
    rank: number;
    title?: ChessTitle;
    name?: string;
    trend_score: { direction: number; delta: number };
    trend_rank: { direction: number; delta: number };
    status: string;
    avatar: string;
    flair_code: string;
    win_count: number;
    loss_count: number;
    draw_count: number;
    country: string;
  };

  export type ChessTitle =
    | "GM"
    | "WGM"
    | "IM"
    | "WIM"
    | "FM"
    | "WFM"
    | "NM"
    | "WNM"
    | "CM"
    | "WCM";

  export default class {
    constructor(options?: { queue: boolean });

    /**
     * Get additional details about a player in a game.
     * @param {string} username - Username of desired profile.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getPlayer: Helpers.RequestFunction<
      [username: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        "@id": string;
        url: string;
        username: string;
        player_id: number;
        title?: ChessTitle;
        status: string;
        name?: string;
        avatar?: string;
        location?: string;
        country: string;
        joined: number;
        last_online: number;
        followers: number;
        is_streamer: boolean;
        twitch_url: string;
        fide: number;
      }
    >;

    /**
     * Get ratings, win/loss, and other stats about a player's game play, tactics, lessons and Puzzle Rush score.
     * @param {string} username - Username of desired profile.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getPlayerStats: Helpers.RequestFunction<
      [username: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        chess_daily: {
          last: { rating: number; date: number; rd: number };
          record: {
            win: number;
            loss: number;
            draw: number;
            time_per_move: number;
            timeout_percent: number;
          };
        };
        chess_rapid: NormalChessStats;
        chess_bullet: NormalChessStats;
        chess_blitz: NormalChessStats;
        fide: number;
        tactics: {
          highest: { rating: number; date: number };
          lowest: { rating: number; date: number };
        };
        puzzle_rush: {
          best: {
            total_attempts: number;
            score: number;
          };
        };
      }
    >;

    /**
     * @deprecated This endpoint was removed by Chess.com 8/25/2021. For more information see the forum post. This endpoint requires a large number of internal resources to maintain, and in the past week it has been used by only one clear developer script with a user-agent that helps us contact the developer. All other access to that endpoint appears to be tests, runaway scripts, or unidentified programs that could work better.
     * @param {string} username - Username of desired profile.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getPlayerOnline: Helpers.RequestFunction<
      [username: string, ...args: Helpers.RequestFunctionDefaultParams],
      {}
    >;

    /**
     * Array of Daily Chess games that a player is currently playing.
     * @param {string} username - Username of desired profile.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getPlayerCurrentDailyChess: Helpers.RequestFunction<
      [username: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        games: {
          white: string;
          black: string;
          url: string;
          fen: string;
          pgn: string;
          turn: PlayerColor;
          move_by: number;
          draw_offer?: PlayerColor;
          last_activity: number;
          start_time: number;
          time_control: string;
          time_class: string;
          rules: string;
          tournament?: string;
          match?: string;
        }[];
      }
    >;

    /**
     * Array of Daily Chess games where it is the player's turn to act.
     * @param {string} username - Username of desired profile.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getPlayerToMoveDailyChess: Helpers.RequestFunction<
      [username: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        games: {
          url: string;
          move_by: 1254438881;
          draw_offer?: true;
          last_activity: 1509810789;
        }[];
      }
    >;

    /**
     * Array of monthly archives available for this player.
     * @param {string} username - Username of desired profile.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getPlayerMonthlyArchives: Helpers.RequestFunction<
      [username: string, ...args: Helpers.RequestFunctionDefaultParams],
      { archives: string[] }
    >;

    /**
     * Array of Live and Daily Chess games that a player has finished.
     * @param {string} username - Username of desired profile.
     * @param {(string | number)} year - Year of matches.
     * @param {(string | number)} month - Month of matches.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getPlayerCompleteMonthlyArchives: Helpers.RequestFunction<
      [
        username: string,
        year: string | number,
        month: string | number,
        ...args: Helpers.RequestFunctionDefaultParams
      ],
      {
        archives: {
          white: MatchPlayer;
          black: MatchPlayer;
          accuracies: {
            white: number;
            black: number;
          };
          url: string;
          fen: string;
          pgn: string;
          start_time: number;
          end_time: number;
          time_control: string;
          rules: string;
          eco?: string;
          tournament?: string;
          match?: string;
        }[];
      }
    >;

    /**
     * Standard multi-game format PGN containing all games for a month.
     * @param {string} username - Username of desired profile.
     * @param {(string | number)} year - Year of matches.
     * @param {(string | number)} month - Month of matches.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getPlayerMultiGamePGN: Helpers.RequestFunction<
      [
        username: string,
        year: string | number,
        month: string | number,
        ...args: Helpers.RequestFunctionDefaultParams
      ],
      Buffer
    >;

    /**
     * List of clubs the player is a member of, with joined date and last activity date.
     * @param {string} username - Username of desired profile.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getPlayerClubs: Helpers.RequestFunction<
      [username: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        clubs: {
          "@id": string;
          name: string;
          last_activity: number;
          icon: string;
          url: number;
          joined: number;
        }[];
      }
    >;

    /**
     * List of Team matches the player has attended, is partecipating or is currently registered.
     * @param {string} username - Username of desired profile.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getPlayerMatches: Helpers.RequestFunction<
      [username: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        finished: FinishedMatch[];
        in_progress: MatchInProgress[];
        registered: Match[];
      }
    >;

    /**
     * List of tournaments the player is registered, is attending or has attended in the past.
     * @param {string} username - Username of desired profile.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getPlayerTournaments: Helpers.RequestFunction<
      [username: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        finished: FinishedPlayerTournament[];
        in_progress: PlayerTournament[];
        registered: PlayerTournament[];
      }
    >;

    /**
     * Game data lookup by ID. Includes PGN, metadata, and player info. For more information on what fields this generates or how it was implemented,
     * {@link https://github.com/andyruwruw/chess-web-api/blob/master/documentation/GAME.md}.
     *
     * Read Before Using: Fair Usage
     *
     * chess-web-api's getGameById method is not an official endpoint of Chess.com's Published Data API. It uses a callback from Chess.com's website to get its data Therefore it is highly unstable and could be changed without warning or stop functioning. Hammering this endpoint with requests could result in an IP ban from Chess.com. This would not only impact your script, but your access to Chess.com itself. The use of this endpoint violates Chess.com's Terms of Service, however Chess.com has informed me that as long as the "script is polite", they have no issue and it will go unnoticed. Corrective action will be taken if there is abuse. There is work to add a simular endpoint to Chess.com, and this library will be updated when that takes place. There is no current timeline there and it could take up to a year.
     * Please submit an issue if you notice any strange behavior to improve this documentation or make fixes. I'll periodically check to make sure the endpoint is working as intended and make fixes when needed.
     *
     * @param {string} id - The game ID.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getGameByID: Helpers.RequestFunction<
      [id: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        game: {
          allowVacation: boolean;
          baseTime1: number;
          canSendTrophy: boolean;
          changesPlayersRating: number;
          colorOfWinner: string;
          endTime: number;
          id: number;
          initialSetup: string;
          isLiveGame: boolean;
          isAbortable: boolean;
          isAnalyzable: boolean;
          isCheckmate: boolean;
          isStalemate: boolean;
          isFinished: boolean;
          isRated: boolean;
          isResignable: boolean;
          lastMove: string;
          moveList: string;
          moveTimestamps: string;
          pgn: string;
          pgnHeaders: {
            Black: string;
            BlackElo: number;
            Date: string;
            ECO: string;
            Event: string;
            FEN: string;
            Result: string;
            SetUp: string;
            Site: string;
            TimeControl: string;
            White: string;
            WhiteElo: string;
          };
          plyCount: number;
          ratingChangeWhite: number;
          ratingChangeBlack: number;
          resultMessage: string;
          timeIncrement1: 0;
          turnColor: string;
          type: string;
          typeName: string;
        };
        players: {
          top: {
            avatarUrl: string;
            canWinOnTime: boolean;
            color: string;
            countryId: number;
            countryName: string;
            defaultTab: number;
            flairCode: string;
            gamesInProgress: number;
            hasMovedAtLeastOnce: boolean;
            id: number;
            isContentHidden: boolean;
            isDrawable: boolean;
            isEnabled: boolean;
            isInLivechess: boolean;
            isOnline: boolean;
            isTouchMove: boolean;
            isVacation: boolean;
            isWhiteOnBottom: boolean;
            lastLoginDate: number;
            location: string;
            memberSince: number;
            membershipCode: string;
            membershipLevel: number;
            offeredDraw: boolean;
            postMoveAction: string;
            rating: number;
            turnTimeRemaining: string;
            username: string;
            vacationRemaining: string;
          };
          bottom: {
            avatarUrl: string;
            canWinOnTime: boolean;
            color: string;
            countryId: number;
            countryName: string;
            defaultTab: number;
            flairCode: string;
            gamesInProgress: number;
            hasMovedAtLeastOnce: boolean;
            id: number;
            isContentHidden: boolean;
            isDrawable: boolean;
            isEnabled: boolean;
            isInLivechess: boolean;
            isOnline: boolean;
            isTouchMove: boolean;
            isVacation: boolean;
            isWhiteOnBottom: boolean;
            lastLoginDate: number;
            location: string;
            memberSince: number;
            membershipCode: string;
            membershipLevel: number;
            offeredDraw: boolean;
            postMoveAction: string;
            rating: number;
            turnTimeRemaining: string;
            username: string;
            vacationRemaining: string;
          };
        };
      }
    >;

    /**
     * Get additional details about a club.
     *
     * All club-based URLs use the club's "URL ID" to specify which club you want data for.
     *
     * The url-ID is the same as found in the URL for the club's web page on www.chess.com. For example, the url-ID of the Chess.com Developer's Club is chess-com-developer-community.
     *
     * @param {string} urlID - Club's unique urlID.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getClub: Helpers.RequestFunction<
      [urlID: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        "@id": string;
        name: string;
        club_id: number;
        icon: string;
        country: string;
        average_daily_rating: number;
        members_count: number;
        created: number;
        last_activity: number;
        visibility: "public" | "private";
        join_request: string;
        admin: string[];
        description: string;
      }
    >;

    /**
     * List of club members (usernames and joined date timestamp), grouped by club-activity frequency. The club-activity is one of this actions.
     *
     * @param {string} urlID - Club's unique urlID.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getClubMembers: Helpers.RequestFunction<
      [urlID: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        username: string;
        joined: number;
      }[]
    >;

    /**
     * List of daily and club matches, grouped by status (registered, in progress, finished).
     *
     * @param {string} urlID - Club's unique urlID.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getClubMatches: Helpers.RequestFunction<
      [urlID: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        finished: FinishedClubMatch[];
        in_progress: ClubMatchInProgress[];
        registered: ClubMatch[];
      }
    >;

    /**
     * Get details about a daily, live and arena tournament.
     *
     * All tournaments-based URLs use the tournament's "URL ID" to specify which tournament you want data for.
     *
     * The url-ID is the same as found in the URL for the tournament's web page on www.chess.com. For example, the url-ID of the Chess.com Developer's Club is
     * -33rd-chesscom-quick-knockouts-1401-1600
     *
     * @param {string} urlID - Tournaments's unique urlID
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getTournament: Helpers.RequestFunction<
      [urlID: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        name: string;
        url: string;
        description: string;
        creator: string;
        status: string;
        finish_time: number;
        settings: {
          type: string;
          rules: string;
          time_class: string;
          time_control: string;
          is_rated: true;
          is_official: false;
          is_invite_only: false;
          initial_group_size: number;
          user_advance_count: number;
          use_tiebreak: true;
          allow_vacation: false;
          winner_places: number;
          registered_user_count: number;
          games_per_opponent: number;
          total_rounds: number;
          concurrent_games_per_opponent: number;
        };
        players: {
          username: string;
          status: string;
        }[];
        rounds: string[];
      }
    >;

    /**
     * Get details about a tournament's round.
     *
     * @param {string} urlID - Tournaments's unique urlID
     * @param {(string | number)} round - Round number
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getTournamentRound: Helpers.RequestFunction<
      [
        urlID: string,
        round: string | number,
        ...args: Helpers.RequestFunctionDefaultParams
      ],
      {
        groups: string[];
        players: {
          username: string;
          is_advancing?: boolean;
        }[];
      }
    >;

    /**
     * Get details about a tournament's round group.
     *
     * @param {string} urlID - Tournaments's unique urlID
     * @param {(string | number)} round - Round number
     * @param {(string | number)} group - Group number
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getTournamentRoundGroup: Helpers.RequestFunction<
      [
        urlID: string,
        round: string | number,
        group: string | number,
        ...args: Helpers.RequestFunctionDefaultParams
      ],
      {
        fair_play_removals: string[];
        games: {
          white: string;
          black: string;
          url: string;
          fen: string;
          pgn: string;
          turn: PlayerColor;
          move_by: number;
          draw_offer?: PlayerColor;
          last_activity: number;
          start_time: number;
          time_control: string;
          time_class: string;
          rules: string;
          eco: string;
          tournament: string;
        }[];
        players: {
          username: string;
          points: number;
          tie_break: number;
          id_advancing: boolean;
        }[];
      }
    >;

    /**
     * Get details about a team match and players playing that match. After the match is finished there will be a link to each player's stats endpoint, in order to get up-to-date information about the player.
     *
     * All team matches-based URLs use the match "ID" to specify which match you want data for.
     *
     * The ID is the same as found in the URL for the team match web page on www.chess.com. For example, the ID WORLD LEAGUE Round 5: Romania vs USA Southwest is 12803.
     *
     * @param {(string | number)} id - Id of desired team match.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getTeamMatch: Helpers.RequestFunction<
      [id: string | number, ...args: Helpers.RequestFunctionDefaultParams],
      {
        name: string;
        url: string;
        description: string;
        start_time: number;
        settings: {
          time_class: string;
          time_control: string;
          initial_setup: string;
          rules: string;
          min_team_players: number;
          max_team_players: number;
          min_required_games: number;
          min_rating: number;
          max_rating: number;
          autostart: boolean;
        };
        status: string;
        boards: number;
        teams: {
          team1: TeamMatchTeam;
          team2: TeamMatchTeam;
        };
      }
    >;

    /**
     * Get details about a team match board. Only in-progress or finished games will be included, so there may be one or two games in this list.
     *
     * @param {(string | number)} id - Id of desired team match.
     * @param {(string | number)} board - Board identifier.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getTeamMatchBoard: Helpers.RequestFunction<
      [
        id: string | number,
        board: string | number,
        ...args: Helpers.RequestFunctionDefaultParams
      ],
      {
        board_scores: {
          player1: number;
          player2: number;
        };
        games: {
          white: MatchPlayer & { team: string };
          black: MatchPlayer & { team: string };
          accuracies?: {
            white: number;
            black: number;
          };
          url: string;
          fen: string;
          pgn: string;
          start_time: number;
          end_time: number;
          time_control: string;
          time_class: string;
          rules: string;
          eco: string;
          match: string;
        }[];
      }
    >;

    /**
     * Get details about a team match and players playing that match. After the match is finished there will be a link to each player's stats endpoint, in order to get up-to-date information about the player.
     *
     * All live team matches-based URLs use the match "ID" to specify which match you want data for.
     *
     * The ID is the same as found in the URL for the team match web page on www.chess.com. For example, the ID Friendly 5+2 is 5833.
     *
     * @param {(string | number)} id - Id of desired live team match.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getTeamLiveMatch: Helpers.RequestFunction<
      [id: string | number, ...args: Helpers.RequestFunctionDefaultParams],
      {
        "@id": string;
        name: string;
        url: string;
        start_time: number;
        status: string;
        boards: number;
        settings: {
          rules: string;
          time_class: string;
          time_control: number;
          time_increment: number;
          min_team_players: number;
          min_required_games: number;
          autostart: false;
        };
        teams: {
          team1: TeamMatchTeam;
          team2: TeamMatchTeam;
        };
      }
    >;

    /**
     * Get details about a team match board. Only in-progress or finished games will be included, so there may be one or two games in this list.
     *
     * @param {(string | number)} id - Id of desired live team match..
     * @param {(string | number)} board - Board identifier.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getTeamLiveMatchBoard: Helpers.RequestFunction<
      [
        id: string | number,
        board: string | number,
        ...args: Helpers.RequestFunctionDefaultParams
      ],
      {
        board_scores: {
          [player: string]: number;
        };
        games: {
          white: MatchPlayer;
          black: MatchPlayer;
          url: string;
          fen: string;
          pgn: string;
          start_time: number;
          end_time: number;
          time_control: string;
          time_class: string;
          rules: string;
          eco: string;
          rated: boolean;
        }[];
      }
    >;

    /**
     * Get additional details about a country.
     *
     * All country-based URLs use the country's 2-character ISO 3166 code (capitalized) to specify which country you want data for.
     *
     * Find their code's here.
     *
     * {@link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2}
     *
     * Additional countries not listed on that official list have been posted by Chess.com.
     *
     * @param {string} iso - Country's ISO identifier
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getCountry: Helpers.RequestFunction<
      [iso: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        "@id": string;
        name: string;
        code: string;
      }
    >;

    /**
     * List of usernames for players who identify themselves as being in this country.
     *
     * @param {string} iso - Country's ISO identifier
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getCountryPlayers: Helpers.RequestFunction<
      [iso: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        players: string[];
      }
    >;

    /**
     * List of URLs for clubs identified as being in or associated with this country.
     *
     * @param {string} iso - Country's ISO identifier
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getCountryClubs: Helpers.RequestFunction<
      [iso: string, ...args: Helpers.RequestFunctionDefaultParams],
      {
        clubs: string[];
      }
    >;

    /**
     * Information about the daily puzzle found in www.chess.com.
     *
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getDailyPuzzle: Helpers.RequestFunction<
      [...args: Helpers.RequestFunctionDefaultParams],
      {
        title: string;
        url: string;
        publish_time: number;
        fen: string;
        pgn: string;
        image: string;
      }
    >;

    /**
     * Information about a randomly picked daily puzzle.
     *
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getDailyPuzzleRandom: Helpers.RequestFunction<
      [...args: Helpers.RequestFunctionDefaultParams],
      {
        title: string;
        url: string;
        publish_time: number;
        fen: string;
        pgn: string;
        image: string;
      }
    >;

    /**
     * Information about Chess.com streamers.
     *
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getStreamers: Helpers.RequestFunction<
      [...args: Helpers.RequestFunctionDefaultParams],
      {
        streamers: {
          username: string;
          avatar: string;
          twitch_url: string;
          url: string;
        }[];
      }
    >;

    /**
     * Information about Chess.com streamers.
     *
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    getLeaderboards: Helpers.RequestFunction<
      [...args: Helpers.RequestFunctionDefaultParams],
      {
        daily: LeaderboardPlayer[];
        daily960: LeaderboardPlayer[];
        live_rapid: LeaderboardPlayer[];
        live_blitz: LeaderboardPlayer[];
        live_bullet: LeaderboardPlayer[];
        live_bughouse: LeaderboardPlayer[];
        live_blitz960: LeaderboardPlayer[];
        live_threecheck: LeaderboardPlayer[];
        live_crazyhouse: LeaderboardPlayer[];
        live_kingofthehill: LeaderboardPlayer[];
        lessons: LeaderboardPlayer[];
        tactics: LeaderboardPlayer[];
      }
    >;

    /**
     * Retrieves an array of usernames of players with a given title.
     *
     * Valid title abbreviations are: GM, WGM, IM, WIM, FM, WFM, NM, WNM, CM, WCM.
     *
     * @param {ChessTitle} titleAbbrev - GM, WGM, IM, WIM, FM, WFM, NM, WNM, CM, WCM.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {Function} [callback] - Function to be called with result (optional).
     */
    getTitledPlayers: Helpers.RequestFunction<
      [titleAbbrev: ChessTitle, ...args: Helpers.RequestFunctionDefaultParams],
      {
        players: string[];
      }
    >;

    /**
     * Adds an item to the priority queue.
     *
     * The provided callback method will be provided two parameters (response, error). Response is the full request result.
     *
     * Additional parameters can be passed to the callback in callbackParameters.
     *
     * The dispatch function determines the difference between parameters to be passed into the chess-web-api method vs the callback function by order.
     *
     * The first array passed into dispatch will always be passed into the chess-web-api method.
     *
     * The second array will always be sent to the callback function, with the response to the request as the first parameter.
     *
     * @param {Function} method - chess-web-api function for request.
     * @param {Function} callback - Function to be called with result
     * @param {any[]} parameters - Array of parameters to be passed into the method.
     * @param {object} [options] - Added options to the end of the URL (optional)
     * @param {any[]} [callbackParameters] - Array of parameters to be passed on to the callback method along with the response. (optional)
     * @param {number} [priority] - Priority in queue (1 is highest priority) (optional)
     */
    dispatch: (
      method: Helpers.RequestFunction,
      callback: (response: any, error: any, ...params: any[]) => void,
      parameters: any[],
      options?: object,
      callbackParameters?: any[],
      priority?: number
    ) => undefined;

    /**
     * Should you wish to clear the queue you can run the following method.
     */
    clearQueue: () => undefined;

    /**
     * Allows you to make any of the helper functions with the added parameter of the etag provided in the header of the last simular request.
     *
     * @param {string} etag - ID of last request made. Found in the header.
     * @param {Function} method - chess-web-api function for request.
     * @param {any[]} parameters - Array of parameters to be passed into the method.
     * @param {object} [options] - Added options to the end of the URL (optional).
     * @param {function} [callback] - Function to be called with result (optional).
     */
    ifChanged: <T extends Helpers.RequestFunction>(
      etag: string,
      method: T,
      parameters: Parameters<T>,
      ...args: Helpers.RequestFunctionDefaultParams
    ) => Promise<{
      changed: boolean;
      response: Awaited<ReturnType<T>>;
    }>;
  }
}
