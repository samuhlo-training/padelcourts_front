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
  const store = useCourtsStore();
  // const { $fetch } = useNuxtApp(); // Removed: $fetch is globally available

  /**
   * Fetch initial courts data from API
   */
  const fetchCourts = async () => {
    store.loading = true;
    store.error = null;

    try {
      console.log("[useCourtData] Fetching courts from /api/courts...");

      // Use explicit $fetch with full proxy path
      const data = await $fetch<any[]>("/api/courts");

      console.log("[useCourtData] Raw Data:", data);

      if (data) {
        // Map raw API response to Court interface
        const mappedCourts: Court[] = data.map((c: any) => ({
          id: c.id,
          name: c.name,
          status: c.status === "busy" ? "occupied" : "free",
          activeMatchId: c.activeMatchId,
          // We construct initial match state if active
          currentMatch: c.activeMatchId
            ? {
                id: c.activeMatchId,
                type: "Partido",
                elapsedTime: "00:00:00", // Will be updated by WS or timer
                isLive: true,
                startTime: c.startTime, // Provided by backend
                pairAName: c.pairAName,
                pairBName: c.pairBName,
              }
            : undefined,
          lastMatch:
            c.status === "free" ? { type: "Partido amistoso" } : undefined,
        }));

        // Commit to store
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
   * Initialize full court system (fetch + ws)
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
