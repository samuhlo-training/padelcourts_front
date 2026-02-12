import { useMatchStore } from "~/stores/match.store";
import { storeToRefs } from "pinia";

export const useHistoryMatchData = () => {
  const store = useMatchStore();
  const { historyMatches, currentMatch, loading, error } = storeToRefs(store);

  /**
   * Asegurar que la lista de historial esté cargada.
   * Útil para la página principal del historial.
   */
  const loadHistory = async () => {
    await store.fetchHistoryMatches();
  };

  /**
   * Cargar un partido específico por ID.
   * Útil para las páginas de detalle.
   */
  const loadMatch = async (matchId: string | number) => {
    await store.fetchMatchDetail(matchId);
  };

  /**
   * Obtener un jugador del partido actual por ID.
   * Ayuda para la vista de detalle del jugador.
   */
  const getPlayerFromMatch = (playerId: string | number) => {
    if (!currentMatch.value) return null;

    const pId = Number(playerId);

    // Buscar en Equipo A
    const pA = currentMatch.value.teamA.players.find((p) => p.id === pId);
    if (pA) return { ...pA, teamName: currentMatch.value.teamA.name };

    // Buscar en Equipo B
    const pB = currentMatch.value.teamB.players.find((p) => p.id === pId);
    if (pB) return { ...pB, teamName: currentMatch.value.teamB.name };

    return null;
  };

  return {
    // Estado (Reactivo)
    historyMatches,
    currentMatch,
    loading,
    error,

    // Métodos
    loadHistory,
    loadMatch,
    getPlayerFromMatch,
  };
};
