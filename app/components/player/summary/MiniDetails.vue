<script setup lang="ts">
/**
 * █ [UI_ATOMO] :: MINI_DETAILS
 * =====================================================================
 * DESC:   Pastillas de estadísticas que muestran métricas clave como "Puntos 08", "Fallos 03".
 * STATUS: ESTABLE (STABLE)
 * =====================================================================
 */

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
  stats: { label: string; value: string | number }[]
}>()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="flex items-center gap-2"
    >
      <span class="px-3 py-1 bg-white/80 rounded-md text-xs font-bold text-brand-dark">
        {{ stat.label }}
      </span>
      <span class="text-sm font-black text-brand-dark tabular-nums">
        {{ String(stat.value).padStart(2, '0') }}
      </span>
    </div>
  </div>
</template>
