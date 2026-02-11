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
// █ DATA: MOCK
// =============================================================================
// In a real app, we would fetch this based on matchId
const matchData = ref<any>({
  id: matchId.value,
  type: 'PARTIDO AMISTOSO',
  date: '12/02/2026',
  timeStart: '17:00',
  timeEnd: '18:40',
  duration: "114'",
  
  // Score
  sets: [
    { set: 1, a: 2, b: 6 },
    { set: 2, a: 6, b: 4 },
    { set: 3, a: 7, b: 5 },
  ],
  scoreA: 2,
  scoreB: 1,

  // Teams
  teamA: {
    name: 'Team A',
    players: [
      {
        id: 101, // Added ID
        name: 'Arturo Coello',
        points: 8,
        errors: 3,
        isMvp: false,
      },
      {
        id: 102, // Added ID
        name: 'Agustin Tapia',
        points: 18,
        errors: 4,
        isMvp: true, // MVP
      },
    ]
  },
  teamB: {
    name: 'Team B',
    players: [
      {
        id: 103, // Added ID
        name: 'Juan Lebron', 
        points: 18,
        errors: 4,
        isMvp: false,
      },
      {
        id: 104, // Added ID
        name: 'Ale Galan',
        points: 18,
        errors: 4,
        isMvp: false,
      },
    ]
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

    <!-- MAIN GRID -->
    <CommonLayoutBentoGrid :cols="4" :rows="3">
      
      <!-- ------------------------------------------------------------------- -->
      <!-- █ MATCH SUMMARY CARD (Full Width Top) -->
      <!-- ------------------------------------------------------------------- -->
      <CommonLayoutBentoItem :cols="4" :rows="2">
        <MatchHistoryBigCard :match="matchData" />
        <div class="text-xs text-center text-gray-300">DEBUG: Match ID: {{ matchId }}</div>
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
           :debug-prop="matchId"
        />
        <div v-if="player.isMvp" class="mt-2 text-center text-xs font-bold italic text-brand-dark">Mejor jugador</div>
      </CommonLayoutBentoItem>

    </CommonLayoutBentoGrid>
  </div>
</template>
