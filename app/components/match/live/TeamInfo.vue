<script setup lang="ts">
/**
 * █ [UI_ATOMO] :: TEAM_INFO
 * =====================================================================
 * DESC:   Muestra la etiqueta del equipo ("TEAM A/B") y los nombres de los jugadores.
 *         Alinea a la izquierda para el lado A, a la derecha para el lado B.
 * STATUS: ESTABLE (STABLE)
 * =====================================================================
 */
import type { TeamData } from '~/types'

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
  team: TeamData
  side: 'A' | 'B'
}>()
</script>

<template>
  <div
    class="flex flex-col gap-0.5"
    :class="side === 'B' ? 'items-end text-right' : 'items-start text-left'"
  >
    <!-- ETIQUETA DE EQUIPO -->
    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      {{ team.name || `Team ${side}` }}
    </span>

    <!-- NOMBRES DE JUGADORES -->
    <p
      v-for="player in team.players"
      :key="player"
      class="text-sm font-bold text-brand-dark uppercase tracking-wide leading-tight"
    >
      {{ player }}
    </p>
  </div>
</template>
