<script setup lang="ts">
/**
 * █ [UI_ATOM] :: DURATION_TIMER (HISTORY)
 * =====================================================================
 * DESC:   Displays the total duration of a past match.
 * STATUS: STABLE
 * =====================================================================
 */
defineProps<{
  duration: string
}>()
</script>

<template>
  <div class="flex flex-col items-end">
    <span class="text-xs font-bold uppercase tracking-widest text-brand-dark mb-1">DURACION :</span>
    <span class="text-6xl font-black text-brand-lime">{{ duration }}</span>
  </div>
</template>
