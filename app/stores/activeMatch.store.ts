/**
 * █ [STORE] :: ACTIVE_MATCH_STORE
 * =====================================================================
 * DESC:   Manages the state of the currently viewed live match.
 *         Handles WebSocket connection, subscription, and data updates.
 * STATUS: WIP
 * =====================================================================
 */
import { defineStore } from "pinia";
import { useWebSocket } from "~/composables/useWebSocket";
import type {
  LiveMatchData,
  CommentaryEntry,
  WebSocketMessage,
  BackendMatchSnapshot,
} from "~/types";

export const useActiveMatchStore = defineStore("activeMatch", () => {
  // ===========================================================================
  // █ STATE
  // ===========================================================================
  const match = ref<LiveMatchData | null>(null);
  const commentary = ref<CommentaryEntry[]>([]);
  const isConnected = ref(false);
  const loading = ref(false);

  // WebSocket Composable
  const {
    connect,
    subscribe,
    unsubscribe,
    onMessage,
    isConnected: wsConnected,
  } = useWebSocket(); // We need to fix useWebSocket export to return isConnected

  // ===========================================================================
  // █ ACTIONS
  // ===========================================================================

  /**
   * Initialize a live match view
   */
  const initLiveMatch = (matchId: number | string) => {
    loading.value = true;

    // 1. Connect WS if not connected
    // TODO: Get URL from env
    if (import.meta.client) {
      connect("ws://localhost:8000/ws");
    }

    // 2. Subscribe to match topic
    setTimeout(() => {
      subscribe(matchId);
    }, 500); // Small delay to ensure connection is open (naive, better to watch isConnected)
  };

  /**
   * cleanup
   */
  const leaveMatch = (matchId: number | string) => {
    unsubscribe(matchId);
    match.value = null;
    commentary.value = [];
  };

  /**
   * Handle incoming WebSocket messages
   */
  const handleMessage = (msg: WebSocketMessage) => {
    switch (msg.type) {
      case "SUBSCRIBED":
        // Initial snapshot
        if (msg.snapshot) {
          updateMatchState(msg.snapshot);
        }
        loading.value = false;
        break;

      case "MATCH_UPDATE":
        if (msg.snapshot) {
          updateMatchState(msg.snapshot);
        }
        break;

      case "MATCH_FINISHED":
        if (match.value && msg.matchId === String(match.value.id)) {
          match.value.isLive = false;
          // Optionally update final score if provided
          if (msg.finalScore) {
            match.value.setsWonA = msg.finalScore.pairASets;
            match.value.setsWonB = msg.finalScore.pairBSets;
            match.value.sets = msg.finalScore.sets.map((s) => ({
              setNumber: 0, // Backend might not send setNumber in finalScore, or we can infer it
              ...s,
            }));
          }
        }
        break;

      case "COMMENTARY":
        if (msg.data) {
          addCommentary(msg.data);
        }
        break;
    }
  };

  // Register listener ONCE
  // Since this is a setup store, this runs when the store is instantiated
  onMessage(handleMessage);

  /**
   * Update local match state from backend snapshot
   */
  const updateMatchState = (snapshot: BackendMatchSnapshot) => {
    /**
     * Maps the flat backend DB-row snapshot into the frontend LiveMatchData shape.
     * Backend fields → Frontend fields:
     *   pairAScore/pairBScore  → pointsA/pointsB  (game points: "0","15","30","40")
     *   pairAGames/pairBGames  → setScoreA/setScoreB  (games in current set)
     *   pairASets/pairBSets    → setsWonA/setsWonB
     *   currentSetIdx          → currentSet
     *   pairAName/pairBName    → teamA/teamB name
     *   startTime              → elapsedMinutes (computed diff)
     *   sets                   → sets (history)
     *   sets                   → sets (history)
     *   sets                   → sets (history)
     */
    const elapsed = snapshot.startTime
      ? Math.floor(
          (Date.now() - new Date(snapshot.startTime).getTime()) / 60_000,
        )
      : 0;

    match.value = {
      id: snapshot.id,
      courtName: snapshot.courtId ? `Pista ${snapshot.courtId}` : "Pista",
      type: snapshot.matchType || "friendly",
      // Timing
      startTime: snapshot.startTime,
      elapsedMinutes: elapsed,
      // Score
      currentSet: snapshot.currentSetIdx ?? 1,
      setScoreA: snapshot.pairAGames ?? 0,
      setScoreB: snapshot.pairBGames ?? 0,
      pointsA: snapshot.pairAScore ?? "0",
      pointsB: snapshot.pairBScore ?? "0",
      setsWonA: snapshot.pairASets ?? 0,
      setsWonB: snapshot.pairBSets ?? 0,
      // Teams
      teamA: {
        name: snapshot.pairAName || "Team A",
        players: [
          snapshot.pairAPlayer1Name || "Player 1",
          snapshot.pairAPlayer2Name || "Player 2",
        ],
      },
      teamB: {
        name: snapshot.pairBName || "Team B",
        players: [
          snapshot.pairBPlayer1Name || "Player 3",
          snapshot.pairBPlayer2Name || "Player 4",
        ],
      },
      // State
      isLive: snapshot.status === "live",
      servingPlayerName: snapshot.servingPlayerName,
      // History
      sets: snapshot.sets || [],
      // Stats
      stats: (snapshot.stats || []).map((s: any) => {
        const pId = s.playerId ?? s.player_id;
        let pName = s.playerName ?? s.player_name;

        // Fallback: If name not in stats, try match player names
        if (!pName) {
          if (pId === snapshot.pairAPlayer1Id)
            pName = snapshot.pairAPlayer1Name;
          else if (pId === snapshot.pairAPlayer2Id)
            pName = snapshot.pairAPlayer2Name;
          else if (pId === snapshot.pairBPlayer1Id)
            pName = snapshot.pairBPlayer1Name;
          else if (pId === snapshot.pairBPlayer2Id)
            pName = snapshot.pairBPlayer2Name;
        }

        return {
          playerId: pId,
          playerName: pName ?? "Unknown",
          pointsWon: s.pointsWon ?? s.points_won ?? 0,
          winners: s.winners ?? 0,
          unforcedErrors: s.unforcedErrors ?? s.unforced_errors ?? 0,
          smashWinners: s.smashWinners ?? s.smash_winners ?? 0,
        };
      }),
    };
  };

  const addCommentary = (entry: any) => {
    commentary.value.unshift({
      id: entry.id || Date.now(),
      text: entry.message || entry.text,
      timestamp: entry.timestamp || new Date().toISOString(),
    });
  };

  // Sync WS connection state
  watch(wsConnected, (val) => {
    isConnected.value = val;
  });

  return {
    match,
    commentary,
    isConnected,
    loading,
    initLiveMatch,
    leaveMatch,
  };
});
