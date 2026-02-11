/**
 * █ [STORE] :: COURTS_STORE
 * =====================================================================
 * DESC:   Manages the global state of courts.
 *         Fetches initial data from API and updates via WebSocket.
 * STATUS: WIP
 * =====================================================================
 */
import { defineStore } from "pinia";
import { useWebSocket } from "~/composables/useWebSocket";
import type { Court, WebSocketMessage } from "~/types";

export const useCourtsStore = defineStore("courts", () => {
  // ===========================================================================
  // █ STATE
  // ===========================================================================
  const courts = ref<Court[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // WebSocket Composable
  const { connect, onMessage, isConnected } = useWebSocket();

  // ===========================================================================
  // █ ACTIONS
  // ===========================================================================

  /**
   * Initialize courts data and WebSocket connection
   */
  /**
   * Set courts data directly (used by useCourtData composable)
   */
  const setCourts = (data: Court[]) => {
    courts.value = data;
  };

  /**
   * Initialize WebSocket connection for real-time updates
   */
  const initWebSocket = () => {
    if (import.meta.client) {
      connect("ws://localhost:8000/ws");
    }

    onMessage((msg: WebSocketMessage) => {
      handleMessage(msg);
    });
  };

  /**
   * Handle incoming WebSocket messages
   */
  const handleMessage = (msg: WebSocketMessage) => {
    console.log("[Store] handleMessage:", msg);

    // Check if data is nested in 'payload' (as seen in logs)
    const data = msg.payload || msg; // Fallback to root if no payload wrapper

    if (msg.type === "COURT_UPDATE" && data.courtId) {
      updateCourtState(data);
    }
  };

  /**
   * Update local court state from WS event
   */
  const updateCourtState = (payload: WebSocketMessage) => {
    console.log("[Store] Updating court state:", payload);
    const court = courts.value.find((c) => c.id === payload.courtId);

    if (!court) {
      console.warn("[Store] Court not found for update:", payload.courtId);
      return;
    }

    console.log("[Store] Court found, updating:", court.id);

    // Update status
    court.status = payload.status === "busy" ? "occupied" : "free";
    court.activeMatchId = payload.activeMatchId;

    if (court.status === "occupied" && payload.activeMatchId) {
      court.currentMatch = {
        id: payload.activeMatchId,
        type: "Partido", // We might need to fetch match type if not in payload
        elapsedTime: "00:00:00", // Will be calc by component
        isLive: true,
        startTime: payload.startTime, // This is the key field from WS
      };
    } else {
      court.currentMatch = undefined;
      court.lastMatch = { type: "Partido finalizado" };
    }
  };

  return {
    courts,
    loading,
    error,
    isConnected,
    initWebSocket,
    setCourts,
  };
});
