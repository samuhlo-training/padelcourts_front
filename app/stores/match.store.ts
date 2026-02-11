import { defineStore } from "pinia";
import type { HistoryMatchSummary, HistoryMatchDetail } from "~/types";

/**
 * █ [STORE] :: MATCH_STORE
 * =====================================================================
 * DESC:   Manages state for historical and live matches.
 * STATUS: ACTIVE
 * =====================================================================
 */
export const useMatchStore = defineStore("match", () => {
  // ===========================================================================
  // █ STATE
  // ===========================================================================
  const historyMatches = ref<HistoryMatchSummary[]>([]);
  const currentMatch = ref<HistoryMatchDetail | null>(null);

  const loading = ref(false);
  const error = ref<string | null>(null);

  // ===========================================================================
  // █ ACTIONS
  // ===========================================================================

  /**
   * ◼️ FETCH HISTORY MATCHES
   * ---------------------------------------------------------
   * Retreives list of finished matches from API.
   * Handles array/object response variance.
   */
  const fetchHistoryMatches = async () => {
    loading.value = true;
    error.value = null;
    try {
      const rawData = await $fetch<any>("/api/matches");

      // VALIDATE -> Check for array or data property
      if (rawData && Array.isArray(rawData)) {
        historyMatches.value = rawData;
      } else if (rawData && rawData.data && Array.isArray(rawData.data)) {
        historyMatches.value = rawData.data;
      } else if (rawData) {
        console.error(
          "Invalid API response for history matches (expected array or {data: array}):",
          rawData,
        );
        historyMatches.value = [];
      }
    } catch (e: any) {
      console.error("Error fetching history:", e);
      error.value = e.message || "Error fetching history";
    } finally {
      loading.value = false;
    }
  };

  /**
   * ◼️ FETCH MATCH DETAIL
   * ---------------------------------------------------------
   * Fetches specific match by ID.
   * Clears current match before fetching new one.
   */
  const fetchMatchDetail = async (id: string | number) => {
    // CACHE CHECK -> Skip if already loaded (Optional optimization)
    if (currentMatch.value?.id === id) {
      // potential early return
    }

    loading.value = true;
    error.value = null;
    currentMatch.value = null; // RESET -> Clear previous data

    try {
      const rawData = await $fetch<any>(`/api/matches/${id}`);

      if (rawData) {
        // NORMALIZE -> Handle {data: ...} wrapper
        if (rawData.data && typeof rawData.data === "object") {
          currentMatch.value = rawData.data;
        } else {
          currentMatch.value = rawData;
        }
      }
    } catch (e: any) {
      console.error(`Error fetching match ${id}:`, e);
      error.value = e.message || `Error fetching match ${id}`;
    } finally {
      loading.value = false;
    }
  };

  /**
   * ◼️ CLEAR CURRENT MATCH
   * ---------------------------------------------------------
   * Resets active match state. Call on unmount.
   */
  const clearCurrentMatch = () => {
    currentMatch.value = null;
    error.value = null;
  };

  return {
    // STATE
    historyMatches,
    currentMatch,
    loading,
    error,

    // ACTIONS
    fetchHistoryMatches,
    fetchMatchDetail,
    clearCurrentMatch,
  };
});
