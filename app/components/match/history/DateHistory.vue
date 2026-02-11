<script setup lang="ts">
/**
 * █ [UI_ATOM] :: DATE_HISTORY
 * =====================================================================
 * DESC:   Displays date and time range for a match.
 * STATUS: STABLE
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
