<script setup lang="ts">
/**
 * █ [UI_ATOMO] :: SET_SCORE
 * =====================================================================
 * DESC:   Muestra la etiqueta "SET X" con la puntuación actual del set "A - B".
 * STATUS: ESTABLE (STABLE)
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
    <!-- ETIQUETA DEL SET -->
    <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">
      Set {{ currentSet }}
    </span>

    <!-- PUNTUACIÓN DEL SET -->
    <div class="flex items-center gap-3 text-3xl font-black text-brand-dark tabular-nums">
      <span>{{ scoreA }}</span>
      <span class="text-gray-300">-</span>
      <span>{{ scoreB }}</span>
    </div>
  </div>
</template>
