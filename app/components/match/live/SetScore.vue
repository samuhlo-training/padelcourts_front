<script setup lang="ts">
/**
 * █ [UI_ATOM] :: SET_SCORE
 * =====================================================================
 * DESC:   Displays "SET X" label with current set score "A - B".
 * STATUS: STABLE
 * =====================================================================
 */

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
  currentSet: number
  scoreA: number
  scoreB: number
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-1">
    <!-- SET LABEL -->
    <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">
      Set {{ currentSet }}
    </span>

    <!-- SET SCORE -->
    <div class="flex items-center gap-3 text-3xl font-black text-brand-dark tabular-nums">
      <span>{{ scoreA }}</span>
      <span class="text-gray-300">-</span>
      <span>{{ scoreB }}</span>
    </div>
  </div>
</template>
