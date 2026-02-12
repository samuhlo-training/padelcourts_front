/**
 * █ [STORE] :: ACTIVE_MATCH_STORE
 * =====================================================================
 * DESC:   Gestiona el estado del partido en vivo que se está visualizando.
 *         Maneja la conexión WebSocket, suscripciones y actualizaciones de datos.
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
  // █ ESTADO (STATE)
  // ===========================================================================
  const match = ref<LiveMatchData | null>(null);
  const commentary = ref<CommentaryEntry[]>([]);
  const isConnected = ref(false);
  const loading = ref(false);

  // Composable de WebSocket
  const {
    connect,
    subscribe,
    unsubscribe,
    onMessage,
    isConnected: wsConnected,
  } = useWebSocket(); // Necesitamos arreglar el export de useWebSocket para que devuelva isConnected

  // ===========================================================================
  // █ ACCIONES (ACTIONS)
  // ===========================================================================

  /**
   * Inicializar la vista de un partido en vivo
   */
  const initLiveMatch = (matchId: number | string) => {
    loading.value = true;

    // 1. Conectar WS si no está conectado
    // TODO: Obtener URL de env
    if (import.meta.client) {
      connect("ws://localhost:8000/ws");
    }

    // 2. Suscribirse al tópico del partido
    setTimeout(() => {
      subscribe(matchId);
    }, 500); // Pequeño retraso para asegurar que la conexión esté abierta (ingenuo, mejor observar isConnected)
  };

  /**
   * Limpieza (cleanup)
   */
  const leaveMatch = (matchId: number | string) => {
    unsubscribe(matchId);
    match.value = null;
    commentary.value = [];
  };

  /**
   * Manejar mensajes entrantes de WebSocket
   */
  const handleMessage = (msg: WebSocketMessage) => {
    switch (msg.type) {
      case "SUBSCRIBED":
        // Snapshot inicial
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
          // Opcionalmente actualizar el marcador final si se proporciona
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

  // Registrar listener UNA VEZ
  // Como este es un setup store, esto se ejecuta cuando se instancian el store
  onMessage(handleMessage);

  /**
   * Actualizar el estado local del partido desde el snapshot del backend
   */
  const updateMatchState = (snapshot: BackendMatchSnapshot) => {
    /**
     * Mapea el snapshot plano de la fila de DB del backend a la forma LiveMatchData del frontend.
     * Campos Backend → Campos Frontend:
     *   pairAScore/pairBScore  → pointsA/pointsB  (puntos del juego: "0","15","30","40")
     *   pairAGames/pairBGames  → setScoreA/setScoreB  (juegos en el set actual)
     *   pairASets/pairBSets    → setsWonA/setsWonB
     *   currentSetIdx          → currentSet
     *   pairAName/pairBName    → teamA/teamB name
     *   startTime              → elapsedMinutes (diferencia calculada)
     *   sets                   → sets (historial)
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
      // Tiempos
      startTime: snapshot.startTime,
      elapsedMinutes: elapsed,
      // Marcador
      currentSet: snapshot.currentSetIdx ?? 1,
      setScoreA: snapshot.pairAGames ?? 0,
      setScoreB: snapshot.pairBGames ?? 0,
      pointsA: snapshot.pairAScore ?? "0",
      pointsB: snapshot.pairBScore ?? "0",
      setsWonA: snapshot.pairASets ?? 0,
      setsWonB: snapshot.pairBSets ?? 0,
      // Equipos
      teamA: {
        name: snapshot.pairAName || "Equipo A",
        players: [
          snapshot.pairAPlayer1Name || "Jugador 1",
          snapshot.pairAPlayer2Name || "Jugador 2",
        ],
      },
      teamB: {
        name: snapshot.pairBName || "Equipo B",
        players: [
          snapshot.pairBPlayer1Name || "Jugador 3",
          snapshot.pairBPlayer2Name || "Jugador 4",
        ],
      },
      // Estado
      isLive: snapshot.status === "live",
      servingPlayerName: snapshot.servingPlayerName,
      // Historial
      sets: snapshot.sets || [],
      // Estadísticas
      stats: (snapshot.stats || []).map((s: any) => {
        const pId = s.playerId ?? s.player_id;
        let pName = s.playerName ?? s.player_name;

        // Fallback: Si el nombre no está en las stats, intentar con los nombres de los jugadores del partido
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
          playerName: pName ?? "Desconocido",
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

  // Sincronizar estado de conexión WS
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
