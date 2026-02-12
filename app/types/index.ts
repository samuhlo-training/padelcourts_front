/**
 * █ [DOMINIO] :: TIPOS
 * =====================================================================
 * DESC:   Interfaces centrales del dominio para todas las funcionalidades.
 * STATUS: WIP
 * =====================================================================
 */

// =============================================================================
// █ DOMINIO DE PISTAS (COURT)
// =============================================================================

/** Información del partido asociada a una pista ocupada */
interface CourtMatch {
  id?: number;
  type: string;
  elapsedTime: string;
  isLive: boolean;
  startTime?: string;
  pairAName?: string;
  pairBName?: string;
}

/** Información del último partido asociada a una pista libre */
interface CourtLastMatch {
  type: string;
}

/** Entidad de pista individual */
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
// █ DOMINIO DE PARTIDO EN VIVO (MATCH LIVE)
// =============================================================================

/** Información del equipo para un partido en vivo */
interface TeamData {
  name: string;
  players: string[];
}

/** Snapshot bruto del partido enviado por el backend (refleja la fila de la DB + datos enriquecidos) */
interface BackendMatchSnapshot {
  id: number;
  matchType: string;
  // Nombres de los equipos
  pairAName: string;
  pairBName: string;
  // IDs de los jugadores
  pairAPlayer1Id: number;
  pairAPlayer2Id: number;
  pairBPlayer1Id: number;
  pairBPlayer2Id: number;
  // Nombres de los jugadores (Enriquecidos)
  pairAPlayer1Name?: string;
  pairAPlayer2Name?: string;
  pairBPlayer1Name?: string;
  pairBPlayer2Name?: string;
  // Puntuación
  pairAScore: string;
  pairBScore: string;
  pairAGames: number;
  pairBGames: number;
  pairASets: number;
  pairBSets: number;
  currentSetIdx: number;
  // Indicadores
  isTieBreak: boolean;
  hasGoldPoint: boolean;
  status: string;
  winnerSide: string | null;
  // Saque
  servingPlayerId: number;
  servingPlayerName?: string;
  // Tiempos
  startTime: string | null;
  endTime: string | null;
  createdAt: string;
  // Pista
  courtId: number | null;
  // Historial de Sets
  sets?: Array<{ setNumber: number; pairAGames: number; pairBGames: number }>;
  // Estadísticas
  stats?: PlayerStats[];
}

/** Estado completo del partido en vivo (formato amigable para el frontend) */
interface LiveMatchData {
  id: number;
  courtName: string;
  type: string;
  // Tiempos
  startTime: string | null;
  elapsedMinutes: number; // Mantener por compatibilidad
  // Puntuación
  currentSet: number;
  setScoreA: number;
  setScoreB: number;
  pointsA: string;
  pointsB: string;
  setsWonA: number;
  setsWonB: number;
  // Equipos
  teamA: TeamData;
  teamB: TeamData;
  // Estado
  isLive: boolean;
  servingPlayerName?: string;
  // Historial
  sets: Array<{ setNumber: number; pairAGames: number; pairBGames: number }>;
  // Estadísticas
  stats: PlayerStats[];
}

/** Entrada individual de comentario */
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

/** Resumen de jugador MVP */
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
// █ DOMINIO DE WEBSOCKET
// =============================================================================

/** Mensaje estándar de WebSocket desde el servidor */
interface WebSocketMessage<T = any> {
  type:
    | "MATCH_UPDATE"
    | "MATCH_FINISHED" // Nuevo evento
    | "COMMENTARY"
    | "WELCOME"
    | "SUBSCRIBED"
    | "UNSUBSCRIBED"
    | "COURT_UPDATE"
    | "ERROR";
  data?: T;
  matchId?: string;
  payload?: any; // Contenedor genérico de carga útil
  courtId?: number; // Para COURT_UPDATE
  status?: "busy" | "free"; // Para COURT_UPDATE
  activeMatchId?: number | null; // Para COURT_UPDATE
  startTime?: string; // Para COURT_UPDATE
  timestamp?: string;
  snapshot?: BackendMatchSnapshot; // Fila bruta de partido del backend, mapeada a LiveMatchData en el store
  // Campos específicos de MATCH_FINISHED
  winnerSide?: string;
  finalScore?: {
    sets: Array<{ pairAGames: number; pairBGames: number }>;
    pairASets: number;
    pairBSets: number;
  };
}

/** Forma de mensaje de servidor alternativa/heredada si es necesaria */
interface ServerMessage {
  type: string;
  payload: any;
}
// =============================================================================
// █ DOMINIO DE HISTORIAL (HISTORY)
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
