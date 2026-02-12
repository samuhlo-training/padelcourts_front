<script setup lang="ts">
/**
 * █ [PÁGINA] :: HISTORIAL
 * =====================================================================
 * DESC:   Lista de partidos pasados con detalles.
 * STATUS: MOCK
 * =====================================================================
 */
import MatchHistoryCard from '~/components/match/history/MatchHistoryCard.vue'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Historial | Padel',
})

// =============================================================================
// █ DATOS: OBTENCIÓN (FETCHING)
// =============================================================================
const { historyMatches: rawMatches, loading: pending, error, loadHistory } = useHistoryMatchData()

// Cargar datos al montar el componente
onMounted(() => {
  loadHistory()
  // Si se desea fetch SSR, usar el patrón useAsyncData dentro de la tienda o aquí.
  // Por ahora asegurando fetch del lado del cliente o híbrido.
  // En realidad, useFetch estándar en la tienda funciona, pero vamos a llamarlo.
})

// Mapear al formato de la interfaz si es necesario.
// La UI espera un formato específico. Vamos a mapearlo.
const historyMatches = computed(() => {
  if (!rawMatches.value || !Array.isArray(rawMatches.value)) return []
  
  return rawMatches.value.map(m => ({
    id: m.id,
    type: m.type,
    date: m.date,
    time: m.time,
    duration: m.duration,
    court: m.court,
    teamA: {
      name: m.team_a.name,
      players: [], // El endpoint de resumen podría no tener jugadores
      sets: m.team_a.sets_won,
    },
    teamB: {
      name: m.team_b.name,
      players: [],
      sets: m.team_b.sets_won,
    },
    score: m.score,
    status: m.status,
  }))
})

</script>

<template>
  <div class="flex flex-col h-full">
    <!-- CABECERA -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-brand-dark tracking-tight ml-8">
        HISTORIAL
      </h1>
    </div>

    <!-- CONTENIDO: LISTA -->
    <!-- Usamos un contenedor con scroll para la lista -->
    <div class="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide pb-20">
      
      <!-- ESTADO DE CARGA -->
      <div v-if="pending" class="flex flex-col items-center justify-center py-20 opacity-50">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-lime"></div>
        <span class="text-sm mt-2 font-medium">Cargando historial...</span>
      </div>

      <!-- ESTADO DE ERROR -->
      <div v-else-if="error" class="text-center py-10 text-red-400">
        <p>Error al cargar el historial.</p>
        <p class="text-xs opacity-60">{{ error }}</p>
      </div>

      <!-- ESTADO VACÍO -->
      <div v-else-if="historyMatches.length === 0" class="text-center py-20 opacity-40">
        <p class="font-bold">No hay partidos finalizados</p>
      </div>

      <!-- LISTA -->
      <MatchHistoryCard 
        v-else
        v-for="match in historyMatches" 
        :key="match.id" 
        :match="match" 
      />
    </div>
  </div>
</template>
