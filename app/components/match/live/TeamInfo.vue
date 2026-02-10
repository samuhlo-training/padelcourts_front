<script setup lang="ts">
/**
 * █ [UI_ATOM] :: TEAM_INFO
 * =====================================================================
 * DESC:   Displays team label ("TEAM A/B") and player names.
 *         Aligns left for side A, right for side B.
 * STATUS: STABLE
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
    <!-- TEAM LABEL -->
    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      Team {{ side }}
    </span>

    <!-- PLAYER NAMES -->
    <p
      v-for="player in team.players"
      :key="player"
      class="text-sm font-bold text-brand-dark uppercase tracking-wide leading-tight"
    >
      {{ player }}
    </p>
  </div>
</template>
