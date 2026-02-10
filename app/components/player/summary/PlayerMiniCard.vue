<script setup lang="ts">
/**
 * █ [UI_MOLECULE] :: PLAYER_MINI_CARD
 * =====================================================================
 * DESC:   Compact MVP player card with lime background. Composes
 *         MVPBadge, player name and MiniDetails.
 * STATUS: STABLE
 * =====================================================================
 */
import type { PlayerMVPData } from '~/types'
import MVPBadge from './MVPBadge.vue'
import MiniDetails from './MiniDetails.vue'

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
  player: PlayerMVPData
}>()
</script>

<template>
  <div class="bg-brand-lime rounded-2xl p-6 shadow-sm flex flex-col gap-3">
    <!-- MVP BADGE -->
    <MVPBadge />

    <!-- PLAYER NAME -->
    <h3 class="text-2xl font-black text-brand-dark uppercase tracking-tight leading-tight">
      {{ player.name }}
    </h3>

    <!-- STATS -->
    <MiniDetails
      :stats="[
        { label: 'Puntos', value: player.points },
        { label: 'Fallos', value: player.errors },
      ]"
    />
  </div>
</template>
