<script setup lang="ts">
/**
 * █ [UI_MOLECULA] :: PLAYER_MINI_CARD
 * =====================================================================
 * DESC:   Tarjeta de jugador MVP compacta con fondo lima. Compone
 *         MVPBadge, nombre del jugador y MiniDetails.
 * STATUS: ESTABLE (STABLE)
 * =====================================================================
 */
import type { PlayerMVPData } from '~/types'
import MVPBadge from './MVPBadge.vue'
import MiniDetails from './MiniDetails.vue'

// =============================================================================
// █ CORE: PROPS
// =============================================================================
const props = defineProps<{
  player: PlayerMVPData
  variant?: 'mvp' | 'team-a' | 'team-b'
  to?: string | object // Objetivo de navegación opcional
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'team-a':
      return 'bg-brand-lime text-brand-dark'
    case 'team-b':
      return 'bg-white border-2 border-brand-red/10 text-brand-dark'
    default: // mvp
      return 'bg-brand-lime text-brand-dark'
  }
})
</script>

<template>
  <!-- VARIANTE DE ENLACE -->
  <NuxtLink
    v-if="to"
    :to="to"
    class="rounded-2xl p-6 shadow-sm flex flex-col gap-3 h-full transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer"
    :class="variantClasses"
  >
    <!-- INSIGNIA MVP (Solo para variante MVP) -->
    <MVPBadge v-if="variant === 'mvp'" />
    
    <!-- INSIGNIA DE EQUIPO (Para variantes de equipo) -->
    <div v-else-if="variant" class="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">
      {{ variant === 'team-a' ? 'Equipo A' : 'Equipo B' }}
    </div>

    <!-- NOMBRE DEL JUGADOR -->
    <h3 class="text-2xl font-black text-brand-dark uppercase tracking-tight leading-tight">
      {{ player.name }}
    </h3>

    <!-- ESTADÍSTICAS -->
    <MiniDetails
      :stats="[
        { label: 'Puntos', value: player.points },
        { label: 'Fallos', value: player.errors },
      ]"
    />
  </NuxtLink>

  <!-- VARIANTE DIV -->
  <div
    v-else
    class="rounded-2xl p-6 shadow-sm flex flex-col gap-3 h-full transition-all duration-200"
    :class="variantClasses"
  >
    <!-- INSIGNIA MVP (Solo para variante MVP) -->
    <MVPBadge v-if="variant === 'mvp'" />
    
    <!-- INSIGNIA DE EQUIPO (Para variantes de equipo) -->
    <div v-else-if="variant" class="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">
      {{ variant === 'team-a' ? 'Equipo A' : 'Equipo B' }}
    </div>

    <!-- NOMBRE DEL JUGADOR -->
    <h3 class="text-2xl font-black text-brand-dark uppercase tracking-tight leading-tight">
      {{ player.name }}
    </h3>

    <!-- ESTADÍSTICAS -->
    <MiniDetails
      :stats="[
        { label: 'Puntos', value: player.points },
        { label: 'Fallos', value: player.errors },
      ]"
    />
  </div>
</template>
