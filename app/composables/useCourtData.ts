/**
 * █ [COMPOSABLE] :: USE_COURT_DATA
 * =====================================================================
 * DESC:   Manages validation and fetching of initial court data.
 *         Decouples data fetching from the store (courts.store.ts).
 * STATUS: ACTIVE
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
  // █ METHODS
  // ===========================================================================

  /**
   * ◼️ FETCH COURTS (INITIAL LOAD)
   * ---------------------------------------------------------
   * REST Fetch to populate initial state.
   * Maps backend data to frontend Court interface.
   */
  const fetchCourts = async () => {
    store.loading = true;
    store.error = null;

    try {
      console.log("[useCourtData] Fetching courts from /api/courts...");

      // FETCH -> Explicit request to avoid hook ambiguity
      const data = await $fetch<any[]>("/api/courts");

      console.log("[useCourtData] Raw Data:", data);

      if (data) {
        // MAP -> Backend DTO to Frontend Entity
        const mappedCourts: Court[] = data.map((c: any) => ({
          id: c.id,
          name: c.name,
          status: c.status === "busy" ? "occupied" : "free",
          activeMatchId: c.activeMatchId,
          lastMatchId: c.lastMatchId,
          // CONSTRUCT -> Initial match state if active
          currentMatch: c.activeMatchId
            ? {
                id: c.activeMatchId,
                type: "Partido",
                elapsedTime: "00:00:00", // UPDATED BY WS/TIMER
                isLive: true,
                startTime: c.startTime,
                pairAName: c.pairAName,
                pairBName: c.pairBName,
              }
            : undefined,
          lastMatch:
            c.status === "free" ? { type: "Partido amistoso" } : undefined,
        }));

        // COMMIT -> Update Store
        store.setCourts(mappedCourts);
      }
    } catch (err: any) {
      console.error("[useCourtData] Fetch Error:", err);
      store.error = err.message || "Failed to load courts";
    } finally {
      store.loading = false;
    }
  };

  /**
   * ◼️ INIT SYSTEM
   * ---------------------------------------------------------
   * Bootstraps the court system:
   * 1. Fetches initial REST data
   * 2. Establishes Websocket connection
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
