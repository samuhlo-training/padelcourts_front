<script setup lang="ts">
/**
 * █ [UI_ATOMO] :: BIG_SCORE
 * =====================================================================
 * DESC:   Gran visualización de la puntuación del juego en brand-lime. Muestra los
 *         puntos del juego actual como "40 - 00".
 * STATUS: ESTABLE (STABLE)
 * =====================================================================
 */

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
  pointsA: string
  pointsB: string
}>()
</script>

<template>
  <div class="flex items-center justify-center gap-4">
    <span class="text-6xl font-black text-brand-lime tabular-nums leading-none">
      {{ pointsA }}
    </span>
    <span class="text-5xl font-black text-brand-dark/20 leading-none">-</span>
    <span class="text-6xl font-black text-brand-dark/40 tabular-nums leading-none">
      {{ pointsB }}
    </span>
  </div>
</template>
