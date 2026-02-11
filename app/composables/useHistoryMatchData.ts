import { useMatchStore } from "~/stores/match.store";
import { storeToRefs } from "pinia";

export const useHistoryMatchData = () => {
  const store = useMatchStore();
  const { historyMatches, currentMatch, loading, error } = storeToRefs(store);

  /**
   * Ensure history list is loaded.
   * Useful for the main history page.
   */
  const loadHistory = async () => {
    await store.fetchHistoryMatches();
  };

  /**
   * Load a specific match by ID.
   * Useful for the detail pages.
   */
  const loadMatch = async (matchId: string | number) => {
    await store.fetchMatchDetail(matchId);
  };

  /**
   * Get a player from the current match by ID.
   * Helper for the player detail view.
   */
  const getPlayerFromMatch = (playerId: string | number) => {
    if (!currentMatch.value) return null;

    const pId = Number(playerId);

    // Search in Team A
    const pA = currentMatch.value.teamA.players.find((p) => p.id === pId);
    if (pA) return { ...pA, teamName: currentMatch.value.teamA.name };

    // Search in Team B
    const pB = currentMatch.value.teamB.players.find((p) => p.id === pId);
    if (pB) return { ...pB, teamName: currentMatch.value.teamB.name };

    return null;
  };

  return {
    // State (Reactive)
    historyMatches,
    currentMatch,
    loading,
    error,

    // Methods
    loadHistory,
    loadMatch,
    getPlayerFromMatch,
  };
};
