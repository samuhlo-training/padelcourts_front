<script setup lang="ts">
/**
 * █ [UI_MOLECULA] :: MATCH_LIVE_CARD
 * =====================================================================
 * DESC:   Tarjeta principal de partido en vivo. Compone SetScore, BigScore, MatchScore
 *         y dos bloques TeamInfo en un diseño vertical centrado.
 * STATUS: ESTABLE (STABLE)
 * =====================================================================
 */
import type { LiveMatchData } from '~/types'
import SetScore from './SetScore.vue'
import BigScore from './BigScore.vue'
import MatchScore from './MatchScore.vue'
import TeamInfo from './TeamInfo.vue'
import { useNow } from '@vueuse/core'

// =============================================================================
// █ CORE: PROPS
// =============================================================================
const props = defineProps<{
  match: LiveMatchData
}>()

// =============================================================================
// █ LÓGICA: CRONÓMETRO (TIMER)
// =============================================================================
const { now, pause, resume } = useNow({ controls: true, interval: 1000 })

// Observar el estado del partido para pausar/reanudar el cronómetro
watch(() => props.match.isLive, (isLive) => {
  if (isLive) resume()
  else pause()
}, { immediate: true })

const formattedElapsedTime = computed(() => {
  if (!props.match.startTime) return "00:00:00"
  
  const start = new Date(props.match.startTime).getTime()
  const current = now.value.getTime()
  const diff = Math.max(0, current - start)
  
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})
</script>

<template>
  <div class="flex flex-col h-full">
    <!-- ------------------------------------------------------------------- -->
    <!-- █ CABECERA: Tipo de partido + tiempo transcurrido -->
    <!-- ------------------------------------------------------------------- -->
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-sm font-black text-brand-dark uppercase tracking-wider">
        {{ match.type }}
      </h2>
      <span class="text-sm font-bold text-gray-400 tabular-nums">
        {{ formattedElapsedTime }}
      </span>
    </div>

    <!-- ------------------------------------------------------------------- -->
    <!-- █ CUERPO: Puntuaciones apiladas verticalmente, centradas -->
    <!-- ------------------------------------------------------------------- -->
    <div class="flex flex-col items-center gap-4 flex-1">
      <!-- PUNTUACIÓN DEL SET -->
      <SetScore
        :current-set="match.currentSet"
        :score-a="match.setScoreA"
        :score-b="match.setScoreB"
      />

      <!-- GRAN PUNTUACIÓN (puntos del juego) -->
      <BigScore
        :points-a="match.pointsA"
        :points-b="match.pointsB"
      />

      <!-- PUNTUACIÓN DEL PARTIDO (pastilla de sets ganados) -->
      <MatchScore
        :sets-a="match.setsWonA"
        :sets-b="match.setsWonB"
      />
    </div>

    <!-- ------------------------------------------------------------------- -->
    <!-- █ PIE DE PÁGINA: Información del equipo, lado a lado -->
    <!-- ------------------------------------------------------------------- -->
    <div class="flex items-start justify-between mt-8 px-4">
      <TeamInfo :team="match.teamA" side="A" />
      <TeamInfo :team="match.teamB" side="B" />
    </div>
  </div>
</template>
