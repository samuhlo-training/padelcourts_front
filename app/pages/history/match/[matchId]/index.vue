<script setup lang="ts">
/**
 * █ [PAGE] :: HISTORY_DETAIL
 * =====================================================================
 * DESC:   Detailed view of a past match.
 *         Shows match summary and player stats.
 * STATUS: MOCK
 * =====================================================================
 */
import PlayerMiniCard from '~/components/player/summary/PlayerMiniCard.vue'
import MatchHistoryBigCard from '~/components/match/history/MatchHistoryBigCard.vue'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const matchId = computed(() => String(route.params.matchId))

useHead({
  title: computed(() => `Partido #${matchId.value} | Padel`),
})

// =============================================================================
// █ DATA: FETCHING
// =============================================================================
const { currentMatch: matchData, loading: pending, error, loadMatch } = useHistoryMatchData()

onMounted(() => {
  if (matchId.value) {
    loadMatch(matchId.value)
  }
})

// Helpers for variant logic
const getVariant = (side: 'A' | 'B', isMvp: boolean) => {
  if (isMvp) return 'mvp'
  return side === 'A' ? 'team-a' : 'team-b'
}
</script>

<template>
  <div class="flex flex-col h-full">
    
    <!-- HEADER: BREADCRUMBS -->
    <CommonBreadCrumbs 
      back-to="/history"
      :items="[
        { label: 'HISTORIAL', to: '/history' }, 
        { label: 'PARTIDO' }
      ]"
    />

    <!-- LOADING STATE -->
    <div v-if="pending" class="flex-1 flex flex-col items-center justify-center opacity-50">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-lime"></div>
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="error" class="flex-1 flex flex-col items-center justify-center text-red-400">
      <p>Error al cargar el partido {{ matchId }}</p>
      <p class="text-xs opacity-60">{{ error }}</p>
    </div>

    <!-- MAIN GRID -->
    <CommonLayoutBentoGrid v-else-if="matchData" :cols="4" :rows="3">
      
      <!-- ------------------------------------------------------------------- -->
      <!-- █ MATCH SUMMARY CARD (Full Width Top) -->
      <!-- ------------------------------------------------------------------- -->
      <CommonLayoutBentoItem :cols="4" :rows="2">
        <MatchHistoryBigCard :match="matchData" />
      </CommonLayoutBentoItem>

      <!-- ------------------------------------------------------------------- -->
      <!-- █ PLAYERS ROW -->
      <!-- ------------------------------------------------------------------- -->
      
      <!-- TEAM A PLAYERS -->
      <CommonLayoutBentoItem :cols="1" :rows="1" variant="raw" v-for="(player, idx) in matchData.teamA.players" :key="`a-${idx}`">
        <PlayerMiniCard 
          :player="player" 
          :variant="getVariant('A', player.isMvp)" 
          :to="`/history/match/${matchId}/player/${player.id}`"
        />
        <div v-if="player.isMvp" class="mt-2 text-center text-xs font-bold italic text-brand-dark">Mejor jugador</div>
      </CommonLayoutBentoItem>

      <!-- TEAM B PLAYERS -->
      <CommonLayoutBentoItem :cols="1" :rows="1" variant="raw" v-for="(player, idx) in matchData.teamB.players" :key="`b-${idx}`">
        <PlayerMiniCard 
           :player="player" 
           :variant="getVariant('B', player.isMvp)"
           :to="`/history/match/${matchId}/player/${player.id}`"
        />
        <div v-if="player.isMvp" class="mt-2 text-center text-xs font-bold italic text-brand-dark">Mejor jugador</div>
      </CommonLayoutBentoItem>

    </CommonLayoutBentoGrid>
  </div>
</template>
