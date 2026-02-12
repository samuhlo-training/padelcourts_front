<script setup lang="ts">
/**
 * █ [UI_MOLECULA] :: COURT_STATUS_CARD
 * =====================================================================
 * DESC:   Tarjeta de fila para una pista. Dos modos visuales: ocupada
 *         (con cronómetro e icono en vivo) o libre (con enlace "Ver último partido").
 *         Las pistas ocupadas enlazan a /courts/:id/live.
 * STATUS: STABLE
 * =====================================================================
 */
import type { Court } from '~/types'
import { PhBroadcast, PhArrowRight } from '@phosphor-icons/vue'
import { useNow } from '@vueuse/core'

// =============================================================================
// █ CORE: PROPS
// =============================================================================
const props = defineProps<{
  court: Court
}>()
// =============================================================================
// █ LÓGICA: CRONÓMETRO (TIMER)
// =============================================================================
const now = useNow({ interval: 1000 })

const formattedElapsedTime = computed(() => {
  const match = props.court.currentMatch
  if (!match) return '00:00:00'
  
  // Si tenemos una hora de inicio, calcular la duración en vivo
  if (match.startTime) {
    const start = new Date(match.startTime).getTime()
    const current = now.value.getTime()
    const diff = Math.max(0, current - start)
    
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  
  // Caída a tiempo transcurrido estático si está disponible
  return match.elapsedTime || '00:00:00'
})
</script>

<template>
  <!-- ======================================================================= -->
  <!-- █ SECCIÓN: TARJETA DE PISTA -->
  <!-- ======================================================================= -->

  <!-- OCUPADA → NuxtLink a la vista en vivo -->
  <NuxtLink
    v-if="court.status === 'occupied'"
    :to="`/courts/${court.id}/live`"
    class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 bg-brand-dark text-white cursor-pointer hover:bg-brand-dark-soft"
  >
    <CommonBaseBadge :label="String(court.id)" variant="lime" />

    <template v-if="court.currentMatch">
      <span class="text-sm font-medium flex-1">
        {{ court.name}}
      </span>

      <span class="px-3 py-1 bg-brand-lime text-brand-dark text-xs font-bold rounded-md tabular-nums">
        {{ formattedElapsedTime }}
      </span>

      <PhBroadcast
        v-if="court.currentMatch.isLive"
        :size="22"
        weight="fill"
        class="text-brand-lime animate-pulse"
      />
    </template>
  </NuxtLink>

  <!-- LIBRE → div estático -->
  <div
    v-else
    class="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 bg-white border border-gray-100 shadow-sm hover:shadow-md"
  >
    <CommonBaseBadge :label="String(court.id)" variant="outline" />
    <span class="text-sm font-medium text-gray-400 flex-1">
      {{ court.name}}
    </span>
    <span class="flex-1" />
    <NuxtLink :to="`/history/match/${court.lastMatchId}`">
      <button class="flex flex-row items-center gap-1.5 text-sm text-gray-600 hover:text-brand-lime hover:font-bold transition-all duration-150">
        Ver último partido
        <PhArrowRight :size="12" weight="bold" />
      </button>
    </NuxtLink>
  </div>
</template>
