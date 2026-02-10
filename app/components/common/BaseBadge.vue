<script setup lang="ts">
/**
 * █ [UI_ATOM] :: BASE_BADGE
 * =====================================================================
 * DESC:   Reusable badge with two variants: lime (occupied) and outline (free).
 * STATUS: STABLE
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
