<script setup lang="ts">
/**
 * █ [UI_ATOM] :: SIDEBAR_BUTTON
 * =====================================================================
 * DESC:   Navigation item for the sidebar. Active state = dark bg + white text.
 *         Uses @phosphor-icons/vue for crisp, consistent icons.
 * STATUS: STABLE
 * =====================================================================
 */
import { PhSquaresFour, PhClockCounterClockwise } from '@phosphor-icons/vue'

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
  label: string
  to: string
  icon: string
}>()

// ICON MAP -> Maps string keys to Phosphor components
const iconMap: Record<string, ReturnType<typeof defineComponent>> = {
  grid: PhSquaresFour,
  list: PhClockCounterClockwise,
}

// ACTIVE DETECTION -> Uses NuxtLink's built-in route matching
const route = useRoute()
</script>

<template>
  <NuxtLink
    :to="to"
    class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
    :class="[
      route.path === to
        ? 'bg-brand-dark text-white shadow-md'
        : 'text-gray-500 hover:bg-gray-100 hover:text-brand-dark'
    ]"
  >
    <!-- ICON -> Phosphor icon component from map -->
    <component
      :is="iconMap[icon]"
      :size="20"
      :weight="route.path === to ? 'fill' : 'regular'"
    />

    <span>{{ label }}</span>

    <!-- ACTIVE INDICATOR -> Small lime dot -->
    <span
      v-if="route.path === to"
      class="ml-auto w-2 h-2 rounded-full bg-brand-lime"
    />
  </NuxtLink>
</template>
