<script setup lang="ts">
/**
 * █ [UI_ATOM] :: BIG_SET_SCORE
 * =====================================================================
 * DESC:   Displays the score of a single set row.
 * STATUS: STABLE
 * =====================================================================
 */
defineProps<{
  setNumber: number
  scoreA: number
  scoreB: number
}>()
</script>

<template>
  <div class="flex items-center gap-4 text-xl font-bold">
    <span class="text-brand-dark uppercase w-16">SET {{ setNumber }}</span>
    <span :class="scoreA > scoreB ? 'text-brand-dark' : 'text-gray-400'">{{ scoreA }}</span>
    <span class="text-gray-300">-</span>
    <span :class="scoreB > scoreA ? 'text-brand-lime' : 'text-gray-400'">{{ scoreB }}</span>
  </div>
</template>
