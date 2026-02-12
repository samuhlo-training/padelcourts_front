<script setup lang="ts">
/**
 * █ [UI_ATOMO] :: SIDEBAR_BUTTON
 * =====================================================================
 * DESC:   Elemento de navegación para la barra lateral. Estado activo = fondo oscuro + texto blanco.
 *         Usa @phosphor-icons/vue para iconos nítidos y consistentes.
 * STATUS: ESTABLE (STABLE)
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

// MAPA DE ICONOS -> Mapea claves de cadena a componentes Phosphor
const iconMap: Record<string, ReturnType<typeof defineComponent>> = {
  grid: PhSquaresFour,
  list: PhClockCounterClockwise,
}

// DETECCIÓN DE ACTIVO -> Usa el emparejamiento de rutas integrado de NuxtLink
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
    <!-- ICONO -> Componente de icono Phosphor desde el mapa -->
    <component
      :is="iconMap[icon]"
      :size="20"
      :weight="route.path === to ? 'fill' : 'regular'"
    />

    <span>{{ label }}</span>

    <!-- INDICADOR DE ACTIVO -> Pequeño punto color lima -->
    <span
      v-if="route.path === to"
      class="ml-auto w-2 h-2 rounded-full bg-brand-lime"
    />
  </NuxtLink>
</template>
