/**
 * █ [COMPOSABLE] :: USE_WEBSOCKET
 * =====================================================================
 * DESC:   Gestiona la conexión WebSocket pura, reconexión y mensajería.
 *         Proporciona métodos para suscribirse/desuscribirse a tópicos.
 * STATUS: WIP
 * =====================================================================
 */
import type { WebSocketMessage } from "~/types";

export const useWebSocket = () => {
  // ===========================================================================
  // █ ESTADO (STATE)
  // ===========================================================================
  const socket = ref<WebSocket | null>(null);
  const isConnected = ref(false);
  const error = ref<Event | null>(null);
  const messages = ref<WebSocketMessage[]>([]);

  // Manejadores de eventos (listeners)
  const messageHandlers = new Set<(msg: WebSocketMessage) => void>();

  // Configuración
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;
  const reconnectInterval = 2000;
  let explicitClose = false;

  // ===========================================================================
  // █ MÉTODOS (METHODS)
  // ===========================================================================

  /**
   * Conectar al servidor WebSocket
   */
  const connect = (url: string) => {
    if (typeof window === "undefined") return; // Guardia SSR
    if (socket.value?.readyState === WebSocket.OPEN) return;

    console.log(`[WS] Conectando a ${url}...`);
    explicitClose = false;

    try {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("[WS] Conectado");
        isConnected.value = true;
        error.value = null;
        reconnectAttempts = 0;
        socket.value = ws;
      };

      ws.onclose = (e) => {
        console.log("[WS] Desconectado", e.code, e.reason);
        isConnected.value = false;
        socket.value = null;

        if (!explicitClose && reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          console.log(
            `[WS] Reconectando en ${reconnectInterval}ms (${reconnectAttempts}/${maxReconnectAttempts})...`,
          );
          setTimeout(() => connect(url), reconnectInterval);
        }
      };

      ws.onerror = (e) => {
        console.error("[WS] Error:", e);
        error.value = e;
      };

      ws.onmessage = (event) => {
        try {
          const validMessage = JSON.parse(event.data) as WebSocketMessage;
          messages.value.push(validMessage);

          // Notificar a los manejadores
          messageHandlers.forEach((handler) => handler(validMessage));
        } catch (err) {
          console.warn("[WS] Error al parsear el mensaje:", event.data);
        }
      };
    } catch (e) {
      console.error("[WS] Conexión fallida:", e);
    }
  };

  /**
   * Desconectar manualmente
   */
  const disconnect = () => {
    explicitClose = true;
    if (socket.value) {
      socket.value.close();
    }
  };

  /**
   * Enviar un mensaje puro
   */
  const send = (msg: object) => {
    if (socket.value?.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify(msg));
    } else {
      console.warn("[WS] No se puede enviar, el socket no está abierto");
    }
  };

  /**
   * Suscribirse al tópico de un partido
   */
  const subscribe = (matchId: string | number) => {
    send({ type: "SUBSCRIBE", matchId: String(matchId) });
  };

  /**
   * Desuscribirse del tópico de un partido
   */
  const unsubscribe = (matchId: string | number) => {
    send({ type: "UNSUBSCRIBE", matchId: String(matchId) });
  };

  /**
   * Registrar un manejador de mensajes
   */
  const onMessage = (handler: (msg: WebSocketMessage) => void) => {
    messageHandlers.add(handler);
    return () => messageHandlers.delete(handler); // Return cleanup
  };

  return {
    socket,
    isConnected,
    error,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    onMessage,
  };
};
