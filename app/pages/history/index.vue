<script setup lang="ts">
/**
 * █ [PAGE] :: HISTORY
 * =====================================================================
 * DESC:   List of past matches with details.
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
// █ DATA: FETCHING
// =============================================================================
const { historyMatches: rawMatches, loading: pending, error, loadHistory } = useHistoryMatchData()

// Load data on mount
onMounted(() => {
  loadHistory()
  // If you want SSR fetch, useAsyncData pattern inside store or here. 
  // For now ensuring client-side fetch or hybrid.
  // Actually, standard useFetch in store works, but let's call it.
})

// Map to UI format if needed, typically store data is already good or we map here
// The UI expects a specific format. Let's map it.
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
      players: [], // Summary endpoint might not have players
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
    <!-- HEADER -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-brand-dark tracking-tight ml-8">
        HISTORIAL
      </h1>
    </div>

    <!-- CONTENT: LIST -->
    <!-- We use a scrollable container for the list -->
    <div class="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide pb-20">
      
      <!-- LOADING STATE -->
      <div v-if="pending" class="flex flex-col items-center justify-center py-20 opacity-50">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-lime"></div>
        <span class="text-sm mt-2 font-medium">Cargando historial...</span>
      </div>

      <!-- ERROR STATE -->
      <div v-else-if="error" class="text-center py-10 text-red-400">
        <p>Error al cargar el historial.</p>
        <p class="text-xs opacity-60">{{ error }}</p>
      </div>

      <!-- EMPTY STATE -->
      <div v-else-if="historyMatches.length === 0" class="text-center py-20 opacity-40">
        <p class="font-bold">No hay partidos finalizados</p>
      </div>

      <!-- LIST -->
      <MatchHistoryCard 
        v-else
        v-for="match in historyMatches" 
        :key="match.id" 
        :match="match" 
      />
    </div>
  </div>
</template>
