<script setup lang="ts">
/**
 * █ [UI_MOLECULE] :: LIVE_COMMENTARY_CARD
 * =====================================================================
 * DESC:   Scrollable feed of live commentary entries.
 *         Shows PhRss icon in header for broadcasting feel.
 * STATUS: STABLE
 * =====================================================================
 */
import type { CommentaryEntry } from '~/types'
import { PhRss } from '@phosphor-icons/vue'

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
  entries: CommentaryEntry[]
}>()
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider">
        Live comentary
      </h3>
      <PhRss :size="18" weight="bold" class="text-brand-lime" />
    </div>

    <!-- FEED -->
    <div class="flex-1 overflow-y-auto space-y-2.5 max-h-60 scrollbar-thin">
      <p
        v-for="entry in entries"
        :key="entry.id"
        class="text-xs text-brand-lime font-medium leading-relaxed"
      >
        {{ entry.text }}
      </p>

      <!-- EMPTY STATE -->
      <p v-if="entries.length === 0" class="text-xs text-gray-300 text-center py-4">
        Sin comentarios aún
      </p>
    </div>
  </div>
</template>
