<script setup lang="ts">
/**
 * █ [UI_MOLECULE] :: MATCH_LIVE_CARD
 * =====================================================================
 * DESC:   Main live match card. Composes SetScore, BigScore, MatchScore
 *         and two TeamInfo blocks into a centered vertical layout.
 * STATUS: STABLE
 * =====================================================================
 */
import type { LiveMatchData } from '~/types'
import SetScore from './SetScore.vue'
import BigScore from './BigScore.vue'
import MatchScore from './MatchScore.vue'
import TeamInfo from './TeamInfo.vue'
import { useNow } from '@vueuse/core'

// =============================================================================
// █ CORE: PROPS
// =============================================================================
const props = defineProps<{
  match: LiveMatchData
}>()

// =============================================================================
// █ LOGIC: TIMER
// =============================================================================
const { now, pause, resume } = useNow({ controls: true, interval: 1000 })

// Watch match status to pause/resume timer
watch(() => props.match.isLive, (isLive) => {
  if (isLive) resume()
  else pause()
}, { immediate: true })

const formattedElapsedTime = computed(() => {
  if (!props.match.startTime) return "00:00:00"
  
  const start = new Date(props.match.startTime).getTime()
  const current = now.value.getTime()
  const diff = Math.max(0, current - start)
  
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- ------------------------------------------------------------------- -->
    <!-- █ HEADER: Match type + elapsed time -->
    <!-- ------------------------------------------------------------------- -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-sm font-black text-brand-dark uppercase tracking-wider">
        {{ match.type }}
      </h2>
      <span class="text-sm font-bold text-gray-400 tabular-nums">
        {{ formattedElapsedTime }}
      </span>
    </div>

    <!-- ------------------------------------------------------------------- -->
    <!-- █ BODY: Scores stacked vertically, centered -->
    <!-- ------------------------------------------------------------------- -->
    <div class="flex flex-col items-center gap-4 flex-1">
      <!-- SET SCORE -->
      <SetScore
        :current-set="match.currentSet"
        :score-a="match.setScoreA"
        :score-b="match.setScoreB"
      />

      <!-- BIG SCORE (game points) -->
      <BigScore
        :points-a="match.pointsA"
        :points-b="match.pointsB"
      />

      <!-- MATCH SCORE (sets won pill) -->
      <MatchScore
        :sets-a="match.setsWonA"
        :sets-b="match.setsWonB"
      />
    </div>

    <!-- ------------------------------------------------------------------- -->
    <!-- █ FOOTER: Team info, side by side -->
    <!-- ------------------------------------------------------------------- -->
    <div class="flex items-start justify-between mt-8 px-4">
      <TeamInfo :team="match.teamA" side="A" />
      <TeamInfo :team="match.teamB" side="B" />
    </div>
  </div>
</template>
