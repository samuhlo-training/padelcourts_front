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

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
  match: LiveMatchData
}>()
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
        {{ match.elapsedMinutes }}'
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
