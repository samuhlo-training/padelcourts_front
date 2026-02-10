<script setup lang="ts">
/**
 * █ [UI_MOLECULE] :: COURT_STATUS_CARD
 * =====================================================================
 * DESC:   Row card for a court. Two visual modes: occupied (with timer
 *         and live icon) or free (with "Ver ultimo partido" link).
 *         Occupied courts link to /courts/:id/live.
 * STATUS: STABLE
 * =====================================================================
 */
import type { Court } from '~/types'
import { PhBroadcast, PhArrowRight } from '@phosphor-icons/vue'

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
  court: Court
}>()
</script>

<template>
  <!-- ======================================================================= -->
  <!-- █ SECTION: COURT CARD -->
  <!-- ======================================================================= -->

  <!-- OCCUPIED → NuxtLink to live view -->
  <NuxtLink
    v-if="court.status === 'occupied'"
    :to="`/courts/${court.id}/live`"
    class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 bg-brand-dark text-white cursor-pointer hover:bg-brand-dark-soft"
  >
    <CommonBaseBadge :label="court.name" variant="lime" />

    <template v-if="court.currentMatch">
      <span class="text-sm font-medium flex-1">
        {{ court.currentMatch.type }}
      </span>

      <span class="px-3 py-1 bg-brand-lime text-brand-dark text-xs font-bold rounded-md tabular-nums">
        {{ court.currentMatch.elapsedTime }}
      </span>

      <PhBroadcast
        v-if="court.currentMatch.isLive"
        :size="22"
        weight="fill"
        class="text-brand-lime animate-pulse"
      />
    </template>
  </NuxtLink>

  <!-- FREE → Static div -->
  <div
    v-else
    class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 bg-white border border-gray-100 shadow-sm hover:shadow-md"
  >
    <CommonBaseBadge :label="court.name" variant="outline" />
    <span class="flex-1" />
    <button class="flex flex-row items-center gap-1.5 text-sm text-gray-400 hover:text-brand-dark transition-colors duration-150">
      Ver ultimo partido
      <PhArrowRight :size="12" weight="bold" />
    </button>
  </div>
</template>
