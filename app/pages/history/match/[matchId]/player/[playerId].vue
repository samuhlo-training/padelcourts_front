<script setup lang="ts">
/**
 * █ [PAGE] :: PLAYER HISTORY DETAIL
 * =====================================================================
 * DESC:   Detailed view of a player's performance in a specific match.
 * STATUS: MOCK
 * =====================================================================
 */
import PlayerStatsCard from '~/components/player/detail/PlayerStatsCard.vue'
import PointHistoryList from '~/components/player/detail/PointHistoryList.vue'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const matchId = computed(() => String(route.params.matchId))
const playerId = computed(() => String(route.params.playerId))

useHead({
  title: 'Detalle Jugador | Padel',
})

// =============================================================================
// █ DATA: MOCK
// =============================================================================
const playerData = ref({
  id: Number(playerId.value),
  name: 'Agustin Tapia',
  teamName: 'Team A',
  country: 'ES',
  totalPoints: 80,
  totalErrors: 40,
  strokes: [
    { name: 'Drive', winners: 20, errors: 10 },
    { name: 'Reves', winners: 30, errors: 12 },
    { name: 'Remate', winners: 22, errors: 33 },
    { name: 'Bandeja', winners: 12, errors: 25 },
    { name: 'Volea', winners: 23, errors: 11 },
    { name: 'Volea reves', winners: 23, errors: 5 },
    { name: 'Globo', winners: 45, errors: 2 },
    { name: 'Dejada', winners: 34, errors: 13 },
    { name: 'Contrapared', winners: 23, errors: 44 },
    { name: 'Bajada de pared', winners: 12, errors: 22 },
  ]
})

const items = ref([
 { id: 1, stroke: 'Drive', timestamp: "01'", isWinner: true },
 { id: 2, stroke: 'Smash', timestamp: "03'", isWinner: true },
 { id: 3, stroke: 'Smash', timestamp: "05'", isWinner: false },
 { id: 4, stroke: 'Drive', timestamp: "01'", isWinner: true },
 { id: 5, stroke: 'Smash', timestamp: "03'", isWinner: true },
 { id: 6, stroke: 'Smash', timestamp: "05'", isWinner: false },
 { id: 7, stroke: 'Smash', timestamp: "05'", isWinner: false },
 { id: 8, stroke: 'Smash', timestamp: "05'", isWinner: false },
 { id: 9, stroke: 'Drive', timestamp: "01'", isWinner: true }, 
])

const matchIdStr = matchId

</script>

<template>
  <div class="flex flex-col h-full">
    
    <!-- HEADER: BREADCRUMBS -->
    <CommonBreadCrumbs 
      :back-to="`/history/match/${matchIdStr}`"
      :items="[
        { label: 'HISTORIAL', to: '/history' }, 
        { label: 'PARTIDO', to: `/history/match/${matchIdStr}` },
        { label: 'JUGADOR' }
      ]"
    />

    <!-- MAIN GRID -->
    <!-- 3 Cols total. Left 2, Right 1. -->
    <CommonLayoutBentoGrid :cols="3" :rows="1">
      
      <!-- LEFT: STATS BREAKDOWN -->
      <CommonLayoutBentoItem :cols="2" :rows="1" variant="raw">
        <PlayerStatsCard 
          :player="playerData" 
        />
      </CommonLayoutBentoItem>

      <!-- RIGHT: POINT HISTORY -->
      <CommonLayoutBentoItem :cols="1" :rows="1" variant="raw">
        <PointHistoryList :points="items" />
      </CommonLayoutBentoItem>

    </CommonLayoutBentoGrid>
  </div>
</template>