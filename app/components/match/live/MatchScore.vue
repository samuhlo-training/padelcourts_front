<script setup lang="ts">
/**
 * █ [UI_ATOMO] :: MATCH_SCORE
 * =====================================================================
 * DESC:   Pastilla circular negra que muestra el total de sets ganados (ej. "1 - 0").
 * STATUS: ESTABLE (STABLE)
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
