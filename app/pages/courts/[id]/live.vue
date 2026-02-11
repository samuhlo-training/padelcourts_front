<script setup lang="ts">
/**
 * █ [PAGE] :: COURT_LIVE
 * =====================================================================
 * DESC:   Live match view for a specific court. Bento grid layout with
 *         MatchLiveCard (2 cols), LiveCommentaryCard and PlayerMiniCard.
 *         Connects to WebSocket via activeMatchStore.
 * STATUS: INTEGRATED
 * =====================================================================
 */

import MatchLiveCard from '~/components/match/live/MatchLiveCard.vue'
import LiveCommentaryCard from '~/components/match/live/LiveCommentaryCard.vue'
import PlayerMiniCard from '~/components/player/summary/PlayerMiniCard.vue'
import { useActiveMatchStore } from '~/stores/activeMatch.store'
import { storeToRefs } from 'pinia'

// =============================================================================
// █ CORE: PAGE META
// =============================================================================
const route = useRoute()
const courtId = computed(() => route.params.id)

definePageMeta({
  layout: 'default',
})

useHead({
  title: computed(() => `Pista ${courtId.value} — Live | Padel`),
})

// =============================================================================
// █ DATA: STORE INTEGRATION
// =============================================================================
const store = useActiveMatchStore()
const courtsStore = useCourtsStore()
const { match, commentary, isConnected } = storeToRefs(store)

/** Resolve the activeMatchId for this court from the courts store */
const activeMatchId = computed(() => {
  const court = courtsStore.courts.find((c) => c.id === Number(courtId.value))
  return court?.activeMatchId ?? null
})

onMounted(() => {
  const matchId = activeMatchId.value
  if (matchId) {
    store.initLiveMatch(matchId)
  }
})

onUnmounted(() => {
  const matchId = activeMatchId.value
  if (matchId) {
    store.leaveMatch(matchId)
  }
})

const mvpPlayer = computed(() => {
  if (!match.value?.stats?.length) {
    return {
      name: 'Esperando datos...',
      points: 0,
      errors: 0,
    }
  }

  // Find player with highest pointsWon
  // We know match.value is defined and stats has at least 1 element because of the check above
  const stats = match.value!.stats!
  const firstPlayer = stats[0]
  
  if (!firstPlayer) {
    return { name: 'N/A', points: 0, errors: 0 }
  }

  const bestPlayer = stats.reduce((prev, current) => {
    return (current.pointsWon > prev.pointsWon) ? current : prev
  }, firstPlayer)

  return {
    name: bestPlayer.playerName,
    points: bestPlayer.pointsWon,
    errors: bestPlayer.unforcedErrors,
  }
})

</script>

<template>
  <!-- ======================================================================= -->
  <!-- █ SECTION: BREADCRUMB -->
  <!-- ======================================================================= -->
  <CommonBreadCrumbs 
    back-to="/courts"
    :items="[
      { label: 'PISTAS' }, 
      { label: `PISTA ${courtId}` }
    ]"
  >
    <template #action>
      <span v-if="match?.isLive && isConnected" class="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded animate-pulse">
        LIVE
      </span>
      <span v-else-if="match && !match.isLive" class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">
        FINALIZADO
      </span>
      <span v-else class="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
        OFFLINE
      </span>
    </template>
  </CommonBreadCrumbs>

  <!-- ======================================================================= -->
  <!-- █ SECTION: BENTO GRID (3 cols) -->
  <!-- ======================================================================= -->
  <CommonLayoutBentoGrid v-if="match" :cols="3" :rows="3">

    <!-- ------------------------------------------------------------------- -->
    <!-- █ MATCH LIVE CARD (2 cols * 3 rows) -->
    <!-- ------------------------------------------------------------------- -->
    <CommonLayoutBentoItem :cols="2" :rows="3">
      <MatchLiveCard :match="match" />
    </CommonLayoutBentoItem>

    <!-- ------------------------------------------------------------------- -->
    <!-- █ LIVE COMMENTARY (1 col * 2 rows) -->
    <!-- ------------------------------------------------------------------- -->
    <CommonLayoutBentoItem :rows="2">
      <LiveCommentaryCard :entries="commentary"  />
    </CommonLayoutBentoItem>

    <!-- ------------------------------------------------------------------- -->
    <!-- █ MVP PLAYER CARD (1 col * 1 row) -->
    <!-- ------------------------------------------------------------------- -->
    <CommonLayoutBentoItem variant="raw">
      <PlayerMiniCard :player="mvpPlayer" variant="mvp" />
    </CommonLayoutBentoItem>

  </CommonLayoutBentoGrid>

  <!-- LOADING STATE -->
  <div v-else class="flex items-center justify-center p-12 text-gray-400 font-medium">
    <div class="animate-spin mr-3 h-5 w-5 border-2 border-brand-lime border-t-transparent rounded-full"></div>
    Conectando al partido...
  </div>
</template>
