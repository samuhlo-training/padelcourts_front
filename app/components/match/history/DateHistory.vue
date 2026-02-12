<script setup lang="ts">
/**
 * █ [UI_ATOMO] :: DATE_HISTORY
 * =====================================================================
 * DESC:   Muestra la fecha y el intervalo de tiempo de un partido.
 * STATUS: ESTABLE (STABLE)
 * =====================================================================
 */
defineProps<{
  date: string
  timeStart: string
  timeEnd: string
}>()
</script>

<template>
  <div class="text-right">
    <div class="text-sm font-bold text-brand-dark">{{ timeStart }} → {{ timeEnd }}</div>
    <div class="text-xs text-gray-400">{{ date }}</div>
  </div>
</template>
