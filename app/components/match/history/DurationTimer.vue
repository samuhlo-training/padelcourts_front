<script setup lang="ts">
/**
 * █ [UI_ATOMO] :: DURATION_TIMER (HISTORY)
 * =====================================================================
 * DESC:   Muestra la duración total de un partido pasado.
 * STATUS: ESTABLE (STABLE)
 * =====================================================================
 */
defineProps<{
  duration: string
}>()
</script>

<template>
  <div class="flex flex-col items-end">
    <span class="text-xs font-bold uppercase tracking-widest text-brand-dark mb-1">DURACIÓN :</span>
    <span class="text-6xl font-black text-brand-lime">{{ duration }}</span>
  </div>
</template>
