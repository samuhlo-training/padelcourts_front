<script setup lang="ts">
/**
 * █ [UI_ATOMO] :: BASE_BADGE
 * =====================================================================
 * DESC:   Badge reutilizable con dos variantes: lime (ocupada) y outline (libre).
 * STATUS: ESTABLE (STABLE)
 * =====================================================================
 */

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
  label: string
  variant?: 'lime' | 'outline'
}>()
</script>

<template>
  <span
    class="inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide whitespace-nowrap"
    :class="[
      variant === 'lime'
        ? 'bg-brand-lime text-brand-dark'
        : 'border border-gray-300 text-gray-600 bg-white'
    ]"
  >
    {{ label }}
  </span>
</template>
