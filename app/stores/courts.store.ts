/**
 * █ [STORE] :: COURTS_STORE
 * =====================================================================
 * DESC:   Gestiona el estado global de las pistas.
 *         Obtiene datos iniciales de la API y los actualiza vía WebSocket.
 * STATUS: WIP
 * =====================================================================
 */
import { defineStore } from "pinia";
import { useWebSocket } from "~/composables/useWebSocket";
import type { Court, WebSocketMessage } from "~/types";

export const useCourtsStore = defineStore("courts", () => {
  // ===========================================================================
  // █ ESTADO (STATE)
  // ===========================================================================
  const courts = ref<Court[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Composable de WebSocket
  const { connect, onMessage, isConnected } = useWebSocket();

  // ===========================================================================
  // █ ACCIONES (ACTIONS)
  // ===========================================================================

  /**
   * Inicializar datos de las pistas y conexión WebSocket
   */
  /**
   * Establecer datos de las pistas directamente (usado por el composable useCourtData)
   */
  const setCourts = (data: Court[]) => {
    courts.value = data;
  };

  /**
   * Inicializar conexión WebSocket para actualizaciones en tiempo real
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
   * Manejar mensajes entrantes de WebSocket
   */
  const handleMessage = (msg: WebSocketMessage) => {
    console.log("[Store] handleMessage:", msg);

    // Comprobar si los datos están anidados en 'payload' (como se ve en los logs)
    const data = msg.payload || msg; // Caída al root si no hay wrapper de payload

    if (msg.type === "COURT_UPDATE" && data.courtId) {
      updateCourtState(data);
    }
  };

  /**
   * Actualizar el estado local de la pista desde un evento WS
   */
  const updateCourtState = (payload: WebSocketMessage) => {
    console.log("[Store] Updating court state:", payload);
    const court = courts.value.find((c) => c.id === payload.courtId);

    if (!court) {
      console.warn(
        "[Store] Pista no encontrada para actualizar:",
        payload.courtId,
      );
      return;
    }

    console.log("[Store] Pista encontrada, actualizando:", court.id);

    // Actualizar estado
    court.status = payload.status === "busy" ? "occupied" : "free";
    court.activeMatchId = payload.activeMatchId;

    if (court.status === "occupied" && payload.activeMatchId) {
      court.currentMatch = {
        id: payload.activeMatchId,
        type: "Partido", // Podríamos necesitar obtener el tipo de partido si no está en el payload
        elapsedTime: "00:00:00", // Será calculado por el componente
        isLive: true,
        startTime: payload.startTime, // Esta es la clave del campo de WS
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
