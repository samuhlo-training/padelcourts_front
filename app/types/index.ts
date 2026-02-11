/**
 * █ [DOMAIN] :: TYPES
 * =====================================================================
 * DESC:   Core domain interfaces for all features.
 * STATUS: WIP
 * =====================================================================
 */

// =============================================================================
// █ COURT DOMAIN
// =============================================================================

/** Match info attached to an occupied court */
interface CourtMatch {
  id?: number;
  type: string;
  elapsedTime: string;
  isLive: boolean;
  startTime?: string;
  pairAName?: string;
  pairBName?: string;
}

/** Last match info attached to a free court */
interface CourtLastMatch {
  type: string;
}

/** Single court entity */
interface Court {
  id: number;
  name: string;
  status: "occupied" | "free";
  activeMatchId?: number | null;
  lastMatchId?: number | null;
  currentMatch?: CourtMatch;
  lastMatch?: CourtLastMatch;
}

// =============================================================================
// █ MATCH LIVE DOMAIN
// =============================================================================

/** Team info for a live match */
interface TeamData {
  name: string;
  players: string[];
}

/** Raw match snapshot as sent by the backend (mirrors the DB row + enriched data) */
interface BackendMatchSnapshot {
  id: number;
  matchType: string;
  // Team Names
  pairAName: string;
  pairBName: string;
  // Player IDs
  pairAPlayer1Id: number;
  pairAPlayer2Id: number;
  pairBPlayer1Id: number;
  pairBPlayer2Id: number;
  // Player Names (Enriched)
  pairAPlayer1Name?: string;
  pairAPlayer2Name?: string;
  pairBPlayer1Name?: string;
  pairBPlayer2Name?: string;
  // Score
  pairAScore: string;
  pairBScore: string;
  pairAGames: number;
  pairBGames: number;
  pairASets: number;
  pairBSets: number;
  currentSetIdx: number;
  // Flags
  isTieBreak: boolean;
  hasGoldPoint: boolean;
  status: string;
  winnerSide: string | null;
  // Serving
  servingPlayerId: number;
  servingPlayerName?: string;
  // Timing
  startTime: string | null;
  endTime: string | null;
  createdAt: string;
  // Court
  courtId: number | null;
  // Set History
  sets?: Array<{ setNumber: number; pairAGames: number; pairBGames: number }>;
  // Stats
  stats?: PlayerStats[];
}

/** Full live match state (frontend-friendly shape) */
interface LiveMatchData {
  id: number;
  courtName: string;
  type: string;
  // Timing
  startTime: string | null;
  elapsedMinutes: number; // Keep for fallback/compat
  // Score
  currentSet: number;
  setScoreA: number;
  setScoreB: number;
  pointsA: string;
  pointsB: string;
  setsWonA: number;
  setsWonB: number;
  // Teams
  teamA: TeamData;
  teamB: TeamData;
  // State
  isLive: boolean;
  servingPlayerName?: string;
  // History
  sets: Array<{ setNumber: number; pairAGames: number; pairBGames: number }>;
  // Stats
  stats: PlayerStats[];
}

/** Single commentary entry */
interface CommentaryEntry {
  id: number;
  text: string;
  timestamp: string;
}

interface PlayerStats {
  playerId: number;
  playerName: string;
  pointsWon: number;
  winners: number;
  unforcedErrors: number;
  smashWinners: number;
}

/** MVP player summary */
interface PlayerMVPData {
  name: string;
  points: number;
  errors: number;
}

export type {
  Court,
  CourtMatch,
  CourtLastMatch,
  TeamData,
  BackendMatchSnapshot,
  LiveMatchData,
  CommentaryEntry,
  PlayerMVPData,
  PlayerStats,
  WebSocketMessage,
  ServerMessage,
};

// =============================================================================
// █ WEBSOCKET DOMAIN
// =============================================================================

/** Standard WebSocket message from server */
interface WebSocketMessage<T = any> {
  type:
    | "MATCH_UPDATE"
    | "MATCH_FINISHED" // New event
    | "COMMENTARY"
    | "WELCOME"
    | "SUBSCRIBED"
    | "UNSUBSCRIBED"
    | "COURT_UPDATE"
    | "ERROR";
  data?: T;
  matchId?: string;
  payload?: any; // Generic payload container
  courtId?: number; // For COURT_UPDATE
  status?: "busy" | "free"; // For COURT_UPDATE
  activeMatchId?: number | null; // For COURT_UPDATE
  startTime?: string; // For COURT_UPDATE
  timestamp?: string;
  snapshot?: BackendMatchSnapshot; // Raw backend match row, mapped to LiveMatchData in store
  // MATCH_FINISHED specific fields
  winnerSide?: string;
  finalScore?: {
    sets: Array<{ pairAGames: number; pairBGames: number }>;
    pairASets: number;
    pairBSets: number;
  };
}

/** Legacy/alternative server message shape if needed */
interface ServerMessage {
  type: string;
  payload: any;
}
// =============================================================================
// █ HISTORY DOMAIN
// =============================================================================

export interface HistoryMatchSummary {
  id: number;
  type: string;
  status: string;
  date: string;
  time: string;
  duration: string;
  court: string;
  winner_side: "pair_a" | "pair_b";
  score: string;
  team_a: {
    name: string;
    sets_won: number;
  };
  team_b: {
    name: string;
    sets_won: number;
  };
}

export interface HistoryPlayerDetailedStats {
  winners: number;
  smashWinners: number;
  volleyWinners: number;
  forehandWinners: number;
  backhandWinners: number;
  unforcedErrors: number;
  netErrors: number;
  baselineErrors: number;
}

export interface HistoryPlayerStats {
  id: number;
  name: string;
  points: number;
  errors: number;
  isMvp: boolean;
  stats?: HistoryPlayerDetailedStats;
}

export interface HistoryPoint {
  id: number;
  set: number;
  game: number;
  score: string;
  winnerId: number;
  type: "winner" | "error";
  opponentErrorId?: number;
  stroke?: string;
  timestamp: string;
}

export interface HistoryMatchDetail {
  id: number;
  type: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  duration: string;
  court: string;
  scoreA: number;
  scoreB: number;
  sets: Array<{ set: number; a: number; b: number }>;
  teamA: {
    name: string;
    players: HistoryPlayerStats[];
  };
  teamB: {
    name: string;
    players: HistoryPlayerStats[];
  };
  pointHistory?: HistoryPoint[];
}
