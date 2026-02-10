<script setup lang="ts">
/**
 * █ [PAGE] :: COURT_LIVE
 * =====================================================================
 * DESC:   Live match view for a specific court. Bento grid layout with
 *         MatchLiveCard (2 cols), LiveCommentaryCard and PlayerMiniCard.
 *         Uses mock data until backend integration.
 * STATUS: WIP
 * =====================================================================
 */
import type { LiveMatchData, CommentaryEntry, PlayerMVPData } from '~/types'
import { PhArrowLeft } from '@phosphor-icons/vue'
import MatchLiveCard from '~/components/match/live/MatchLiveCard.vue'
import LiveCommentaryCard from '~/components/match/live/LiveCommentaryCard.vue'
import PlayerMiniCard from '~/components/player/summary/PlayerMiniCard.vue'

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
// █ DATA: MOCK MATCH
// =============================================================================
const match = ref<LiveMatchData>({
  id: 1,
  courtName: `PISTA ${courtId.value}`,
  type: 'Partido amistoso',
  elapsedMinutes: 55,
  currentSet: 2,
  setScoreA: 2,
  setScoreB: 4,
  pointsA: '40',
  pointsB: '00',
  setsWonA: 1,
  setsWonB: 0,
  teamA: { name: 'Team A', players: ['Alex Galan', 'Fede Chingoto'] },
  teamB: { name: 'Team B', players: ['Arturo Coello', 'Agustin Tapia'] },
  isLive: true,
})

const commentary = ref<CommentaryEntry[]>(
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    text: 'Arturo hizo un smash victorioso a 120km/h !',
    timestamp: new Date().toISOString(),
  })),
)

const mvpPlayer = ref<PlayerMVPData>({
  name: 'Arturo Coello',
  points: 8,
  errors: 3,
})
</script>

<template>
  <!-- ======================================================================= -->
  <!-- █ SECTION: BREADCRUMB -->
  <!-- ======================================================================= -->
  <div class="mb-8 flex items-center gap-3">
    <NuxtLink
      to="/courts"
      class="text-gray-400 hover:text-brand-dark transition-colors"
    >
      <PhArrowLeft :size="20" weight="bold" />
    </NuxtLink>
    <h1 class="text-3xl font-black text-brand-dark tracking-tight">
      PISTAS
      <span class="text-gray-300 mx-1">→</span>
      <span>PISTA {{ courtId }}</span>
    </h1>
  </div>

  <!-- ======================================================================= -->
  <!-- █ SECTION: BENTO GRID (3 cols) -->
  <!-- ======================================================================= -->
  <CommonLayoutBentoGrid>

    <!-- ------------------------------------------------------------------- -->
    <!-- █ MATCH LIVE CARD (2 cols * 2 rows) -->
    <!-- ------------------------------------------------------------------- -->
    <CommonLayoutBentoItem :cols="2" :rows="2">
      <MatchLiveCard :match="match" />
    </CommonLayoutBentoItem>

    <!-- ------------------------------------------------------------------- -->
    <!-- █ LIVE COMMENTARY -->
    <!-- ------------------------------------------------------------------- -->
    <CommonLayoutBentoItem>
      <LiveCommentaryCard :entries="commentary" />
    </CommonLayoutBentoItem>

    <!-- ------------------------------------------------------------------- -->
    <!-- █ MVP PLAYER CARD -->
    <!-- ------------------------------------------------------------------- -->
    <div class="md:col-span-1">
      <PlayerMiniCard :player="mvpPlayer" />
    </div>

  </CommonLayoutBentoGrid>
</template>
