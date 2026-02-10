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
  type: string;
  elapsedTime: string;
  isLive: boolean;
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

/** Full live match state */
interface LiveMatchData {
  id: number;
  courtName: string;
  type: string;
  elapsedMinutes: number;
  currentSet: number;
  setScoreA: number;
  setScoreB: number;
  pointsA: string;
  pointsB: string;
  setsWonA: number;
  setsWonB: number;
  teamA: TeamData;
  teamB: TeamData;
  isLive: boolean;
}

/** Single commentary entry */
interface CommentaryEntry {
  id: number;
  text: string;
  timestamp: string;
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
  LiveMatchData,
  CommentaryEntry,
  PlayerMVPData,
};
