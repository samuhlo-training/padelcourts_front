<script setup lang="ts">
/**
 * █ [UI_ATOM] :: MATCH_SCORE
 * =====================================================================
 * DESC:   Black circle pill showing total sets won (e.g. "1 - 0").
 * STATUS: STABLE
 * =====================================================================
 */

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
  setsA: number
  setsB: number
}>()
</script>

<template>
  <div
    class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-brand-dark rounded-full"
  >
    <span class="text-sm font-bold text-brand-lime tabular-nums">{{ setsA }}</span>
    <span class="text-sm text-gray-500">-</span>
    <span class="text-sm font-bold text-white tabular-nums">{{ setsB }}</span>
  </div>
</template>
