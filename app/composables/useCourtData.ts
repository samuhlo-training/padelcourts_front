/**
 * █ [COMPOSABLE] :: USE_COURT_DATA
 * =====================================================================
 * DESC:   Gestiona la validación y obtención de datos iniciales de las pistas.
 *         Desacopla la obtención de datos del store (courts.store.ts).
 * STATUS: ACTIVO
 * =====================================================================
 */

import { useCourtsStore } from "~/stores/courts.store";
import type { Court } from "~/types";

export const useCourtData = () => {
  // ===========================================================================
  // █ INIT
  // ===========================================================================
  const store = useCourtsStore();

  // ===========================================================================
  // █ MÉTODOS (METHODS)
  // ===========================================================================

  /**
   * ◼️ OBTENER PISTAS (CARGA INICIAL) [FETCH COURTS]
   * ---------------------------------------------------------
   * REST Fetch para poblar el estado inicial.
   * Mapea datos del backend a la interfaz Court del frontend.
   */
  const fetchCourts = async () => {
    store.loading = true;
    store.error = null;

    try {
      console.log("[useCourtData] Obteniendo pistas desde /api/courts...");

      // FETCH -> Solicitud explícita para evitar ambigüedad de hooks
      const data = await $fetch<any[]>("/api/courts");

      console.log("[useCourtData] Raw Data:", data);

      if (data) {
        // MAP -> DTO del Backend a Entidad del Frontend
        const mappedCourts: Court[] = data.map((c: any) => ({
          id: c.id,
          name: c.name,
          status: c.status === "busy" ? "occupied" : "free",
          activeMatchId: c.activeMatchId,
          lastMatchId: c.lastMatchId,
          // CONSTRUCT -> Estado inicial del partido si está activo
          currentMatch: c.activeMatchId
            ? {
                id: c.activeMatchId,
                type: "Partido",
                elapsedTime: "00:00:00", // ACTUALIZADO POR WS/TIMER
                isLive: true,
                startTime: c.startTime,
                pairAName: c.pairAName,
                pairBName: c.pairBName,
              }
            : undefined,
          lastMatch:
            c.status === "free" ? { type: "Partido amistoso" } : undefined,
        }));

        // COMMIT -> Actualizar Store
        store.setCourts(mappedCourts);
      }
    } catch (err: any) {
      console.error("[useCourtData] Error al obtener:", err);
      store.error = err.message || "Error al cargar las pistas";
    } finally {
      store.loading = false;
    }
  };

  /**
   * ◼️ INICIALIZAR SISTEMA (INIT SYSTEM)
   * ---------------------------------------------------------
   * Arranca el sistema de pistas:
   * 1. Obtiene datos REST iniciales
   * 2. Establece conexión Websocket
   */
  const init = async () => {
    await fetchCourts();
    store.initWebSocket();
  };

  return {
    fetchCourts,
    init,
  };
};
