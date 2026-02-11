/**
 * █ [COMPOSABLE] :: USE_WEBSOCKET
 * =====================================================================
 * DESC:   Manages raw WebSocket connection, reconnection, and messaging.
 *         Provides methods to subscribe/unsubscribe to topics.
 * STATUS: WIP
 * =====================================================================
 */
import type { WebSocketMessage } from "~/types";

export const useWebSocket = () => {
  // ===========================================================================
  // █ STATE
  // ===========================================================================
  const socket = ref<WebSocket | null>(null);
  const isConnected = ref(false);
  const error = ref<Event | null>(null);
  const messages = ref<WebSocketMessage[]>([]);

  // Event listeners
  const messageHandlers = new Set<(msg: WebSocketMessage) => void>();

  // Configuration
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 5;
  const reconnectInterval = 2000;
  let explicitClose = false;

  // ===========================================================================
  // █ METHODS
  // ===========================================================================

  /**
   * Connect to the WebSocket server
   */
  const connect = (url: string) => {
    if (typeof window === "undefined") return; // SSR Guard
    if (socket.value?.readyState === WebSocket.OPEN) return;

    console.log(`[WS] Connecting to ${url}...`);
    explicitClose = false;

    try {
      const ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("[WS] Connected");
        isConnected.value = true;
        error.value = null;
        reconnectAttempts = 0;
        socket.value = ws;
      };

      ws.onclose = (e) => {
        console.log("[WS] Disconnected", e.code, e.reason);
        isConnected.value = false;
        socket.value = null;

        if (!explicitClose && reconnectAttempts < maxReconnectAttempts) {
          reconnectAttempts++;
          console.log(
            `[WS] Reconnecting in ${reconnectInterval}ms (${reconnectAttempts}/${maxReconnectAttempts})...`,
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

          // Notify handlers
          messageHandlers.forEach((handler) => handler(validMessage));
        } catch (err) {
          console.warn("[WS] Failed to parse message:", event.data);
        }
      };
    } catch (e) {
      console.error("[WS] Connection failed:", e);
    }
  };

  /**
   * Disconnect manually
   */
  const disconnect = () => {
    explicitClose = true;
    if (socket.value) {
      socket.value.close();
    }
  };

  /**
   * Send a raw message
   */
  const send = (msg: object) => {
    if (socket.value?.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify(msg));
    } else {
      console.warn("[WS] Cannot send, socket not open");
    }
  };

  /**
   * Subscribe to a match topic
   */
  const subscribe = (matchId: string | number) => {
    send({ type: "SUBSCRIBE", matchId: String(matchId) });
  };

  /**
   * Unsubscribe from a match topic
   */
  const unsubscribe = (matchId: string | number) => {
    send({ type: "UNSUBSCRIBE", matchId: String(matchId) });
  };

  /**
   * Register a message handler
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
