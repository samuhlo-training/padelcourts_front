import { defineStore } from "pinia";
import type { HistoryMatchSummary, HistoryMatchDetail } from "~/types";

/**
 * █ [STORE] :: MATCH_STORE
 * =====================================================================
 * DESC:   Gestiona el estado de los partidos históricos y en vivo.
 * STATUS: ACTIVO
 * =====================================================================
 */
export const useMatchStore = defineStore("match", () => {
  // ===========================================================================
  // █ ESTADO (STATE)
  // ===========================================================================
  const historyMatches = ref<HistoryMatchSummary[]>([]);
  const currentMatch = ref<HistoryMatchDetail | null>(null);

  const loading = ref(false);
  const error = ref<string | null>(null);

  // ===========================================================================
  // █ ACCIONES (ACTIONS)
  // ===========================================================================

  /**
   * ◼️ OBTENER PARTIDOS DEL HISTORIAL (FETCH HISTORY MATCHES)
   * ---------------------------------------------------------
   * Recupera la lista de partidos finalizados desde la API.
   * Maneja la varianza de respuesta entre array y objeto.
   */
  const fetchHistoryMatches = async () => {
    loading.value = true;
    error.value = null;
    try {
      const rawData = await $fetch<any>("/api/matches");

      // VALIDAR -> Comprobar si es un array o una propiedad 'data'
      if (rawData && Array.isArray(rawData)) {
        historyMatches.value = rawData;
      } else if (rawData && rawData.data && Array.isArray(rawData.data)) {
        historyMatches.value = rawData.data;
      } else if (rawData) {
        console.error(
          "Respuesta de API inválida para el historial de partidos (se esperaba array o {data: array}):",
          rawData,
        );
        historyMatches.value = [];
      }
    } catch (e: any) {
      console.error("Error al obtener el historial:", e);
      error.value = e.message || "Error al obtener el historial";
    } finally {
      loading.value = false;
    }
  };

  /**
   * ◼️ OBTENER DETALLE DEL PARTIDO (FETCH MATCH DETAIL)
   * ---------------------------------------------------------
   * Obtiene un partido específico por ID.
   * Limpia el partido actual antes de obtener uno nuevo.
   */
  const fetchMatchDetail = async (id: string | number) => {
    // COMPROBACIÓN DE CACHÉ -> Omitir si ya está cargado (Optimización opcional)
    if (currentMatch.value?.id === id) {
      // retorno temprano potencial
    }

    loading.value = true;
    error.value = null;
    currentMatch.value = null; // REINICIAR -> Limpiar datos previos

    try {
      const rawData = await $fetch<any>(`/api/matches/${id}`);

      if (rawData) {
        // NORMALIZAR -> Manejar el wrapper {data: ...}
        if (rawData.data && typeof rawData.data === "object") {
          currentMatch.value = rawData.data;
        } else {
          currentMatch.value = rawData;
        }
      }
    } catch (e: any) {
      console.error(`Error al obtener el partido ${id}:`, e);
      error.value = e.message || `Error al obtener el partido ${id}`;
    } finally {
      loading.value = false;
    }
  };

  /**
   * ◼️ LIMPIAR PARTIDO ACTUAL (CLEAR CURRENT MATCH)
   * ---------------------------------------------------------
   * Reinicia el estado del partido activo. Llamar al desmontar.
   */
  const clearCurrentMatch = () => {
    currentMatch.value = null;
    error.value = null;
  };

  return {
    // ESTADO
    historyMatches,
    currentMatch,
    loading,
    error,

    // ACCIONES
    fetchHistoryMatches,
    fetchMatchDetail,
    clearCurrentMatch,
  };
});
