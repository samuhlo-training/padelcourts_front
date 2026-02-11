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
// █ DATA: FETCHING
// =============================================================================
const { currentMatch, loading: pending, error, loadMatch, getPlayerFromMatch } = useHistoryMatchData()

onMounted(async () => {
  // If fetching match detail failed or empty in previous page, we might need to load it here
  if (!currentMatch.value || String(currentMatch.value.id) !== String(matchId.value)) {
    await loadMatch(matchId.value)
  }
})

const playerData = computed(() => {
  const p = getPlayerFromMatch(playerId.value)
  if (!p) return null
  
  // Map stats object to strokes array for PlayerStatsCard
  const strokeMapping = [
    { name: 'Winners', winners: p.stats?.winners || 0, errors: 0 },
    { name: 'Smash', winners: p.stats?.smashWinners || 0, errors: 0 },
    { name: 'Volea', winners: p.stats?.volleyWinners || 0, errors: 0 },
    { name: 'Derecha', winners: p.stats?.forehandWinners || 0, errors: 0 },
    { name: 'Revés', winners: p.stats?.backhandWinners || 0, errors: 0 },
    { name: 'Errores No Forzados', winners: 0, errors: p.stats?.unforcedErrors || 0 },
    { name: 'Red', winners: 0, errors: p.stats?.netErrors || 0 },
    { name: 'Fondo', winners: 0, errors: p.stats?.baselineErrors || 0 },
  ]

  return {
    id: p.id,
    name: p.name,
    teamName: p.teamName,
    country: 'ES',
    totalPoints: p.points,
    totalErrors: p.errors,
    strokes: strokeMapping
  }
})

// Map pointHistory to PointHistoryList format
const items = computed(() => {
  if (!currentMatch.value?.pointHistory) return []
  
  const pId = Number(playerId.value)
  
  // Only show points where this player was the protagonist (won the point or made the error)
  return currentMatch.value.pointHistory
    .filter(pt => pt.winnerId === pId || pt.opponentErrorId === pId)
    .map(pt => ({
      id: pt.id,
      stroke: pt.stroke || (pt.winnerId === pId ? 'Ganador' : 'Error'),
      timestamp: pt.timestamp, // Assuming backend provides a "time elapsed" string or similar
      isWinner: pt.winnerId === pId
    }))
})

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

    <!-- LOADING -->
    <div v-if="pending" class="flex-1 flex flex-col items-center justify-center opacity-50">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-lime"></div>
    </div>

    <!-- ERROR or NOT FOUND -->
    <div v-else-if="error || !playerData" class="flex-1 flex flex-col items-center justify-center text-red-400">
      <p>Error al cargar datos del jugador</p>
      <p v-if="error" class="text-xs opacity-60">{{ error }}</p>
      <p v-else class="text-xs opacity-60">Jugador no encontrado en este partido</p>
    </div>

    <!-- MAIN GRID -->
    <!-- 3 Cols total. Left 2, Right 1. -->
    <CommonLayoutBentoGrid v-else :cols="3" :rows="1">
      
      <!-- LEFT: STATS BREAKDOWN -->
      <CommonLayoutBentoItem :cols="2" :rows="1" variant="raw">
        <PlayerStatsCard 
          :player="playerData" 
        />
      </CommonLayoutBentoItem>

      <!-- RIGHT: POINT HISTORY -->
      <CommonLayoutBentoItem :cols="1" :rows="1" variant="raw">
        <div v-if="items.length === 0" class="h-full flex items-center justify-center bg-white rounded-2xl p-6 text-gray-400 text-sm text-center">
          Detalle de puntos no disponible en el historial
        </div>
        <PointHistoryList v-else :points="items" />
      </CommonLayoutBentoItem>

    </CommonLayoutBentoGrid>
  </div>
</template>