<script setup lang="ts">
/**
 * █ [PÁGINA] :: DETALLE_HISTORIAL_JUGADOR
 * =====================================================================
 * DESC:   Vista detallada del rendimiento de un jugador en un partido específico.
 * STATUS: MOCK
 * =====================================================================
 */
import PlayerStatsCard from '~/components/player/detail/PlayerStatsCard.vue'
import PointHistoryList, { type PointHistoryItem } from '~/components/player/detail/PointHistoryList.vue'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const matchId = computed(() => String(route.params.matchId))
const playerId = computed(() => String(route.params.playerId))

useHead({
  title: 'Detalle Jugador | Padel',
})

// =============================================================================
// █ DATOS: OBTENCIÓN (FETCHING)
// =============================================================================
const { currentMatch, loading: pending, error, loadMatch, getPlayerFromMatch } = useHistoryMatchData()

onMounted(async () => {
  // Si la obtención del detalle del partido falló o estaba vacía en la página anterior, podríamos necesitar cargarla aquí
  if (!currentMatch.value || String(currentMatch.value.id) !== String(matchId.value)) {
    await loadMatch(matchId.value)
  }
})

const playerData = computed(() => {
  const p = getPlayerFromMatch(playerId.value)
  if (!p) return null
  
  // Mapear el objeto stats al array strokes para PlayerStatsCard
  const strokeMapping = [
    { name: 'Winners', winners: p.stats?.winners || 0, errors: 0 },
    { name: 'Smash', winners: p.stats?.smashWinners || 0, errors: 0 },
    { name: 'Volea', winners: p.stats?.volleyWinners || 0, errors: 0 },
    { name: 'Derecha', winners: p.stats?.forehandWinners || 0, errors: 0 },
    { name: 'Revés', winners: p.stats?.backhandWinners || 0, errors: 0 },
    { name: 'Errores No Forzados', winners: 0, errors: p.stats?.unforcedErrors || 0 },
    { name: 'Red', winners: 0, errors: p.stats?.netErrors || 0 },
    { name: 'Fondo', winners: 0, errors: p.stats?.baselineErrors || 0 },
  ]

  return {
    id: p.id,
    name: p.name,
    teamName: p.teamName,
    country: 'ES',
    totalPoints: p.points,
    totalErrors: p.errors,
    strokes: strokeMapping
  }
})

// Mapear pointHistory al formato de PointHistoryList
const items = computed(() => {
  if (!currentMatch.value?.pointHistory) return []
  
  const pId = Number(playerId.value)
  
  // Mostrar solo los puntos donde este jugador fue el protagonista (ganó el punto o cometió el error)
  return currentMatch.value.pointHistory
    .filter(pt => pt.winnerId === pId || pt.opponentErrorId === pId)
    .map(pt => ({
      id: pt.id,
      stroke: (pt.stroke as any) || (pt.winnerId === pId ? 'winner' : 'error'),
      timestamp: pt.timestamp, // Asumiendo que el backend proporciona una cadena de "tiempo transcurrido" o similar
      isWinner: pt.winnerId === pId
    })) as PointHistoryItem[]
})

const matchIdStr = matchId

</script>

<template>
  <div class="flex flex-col h-full">
    
    <!-- CABECERA: MIGAS DE PAN (BREADCRUMBS) -->
    <CommonBreadCrumbs 
      :back-to="`/history/match/${matchIdStr}`"
      :items="[
        { label: 'HISTORIAL', to: '/history' }, 
        { label: 'PARTIDO', to: `/history/match/${matchIdStr}` },
        { label: 'JUGADOR' }
      ]"
    />

    <!-- CARGANDO -->
    <div v-if="pending" class="flex-1 flex flex-col items-center justify-center opacity-50">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-lime"></div>
    </div>

    <!-- ERROR o NO ENCONTRADO -->
    <div v-else-if="error || !playerData" class="flex-1 flex flex-col items-center justify-center text-red-400">
      <p>Error al cargar datos del jugador</p>
      <p v-if="error" class="text-xs opacity-60">{{ error }}</p>
      <p v-else class="text-xs opacity-60">Jugador no encontrado en este partido</p>
    </div>

    <!-- CUADRÍCULA PRINCIPAL -->
    <!-- 3 columnas en total. Izquierda 2, Derecha 1. -->
    <CommonLayoutBentoGrid v-else :cols="3" :rows="1">
      
      <!-- IZQUIERDA: DESGLOSE DE ESTADÍSTICAS -->
      <CommonLayoutBentoItem :cols="2" :rows="1" variant="raw">
        <PlayerStatsCard 
          :player="playerData" 
        />
      </CommonLayoutBentoItem>

      <!-- DERECHA: HISTORIAL DE PUNTOS -->
      <CommonLayoutBentoItem :cols="1" :rows="1" variant="raw">
        <div v-if="items.length === 0" class="h-full flex items-center justify-center bg-white rounded-2xl p-6 text-gray-400 text-sm text-center">
          Detalle de puntos no disponible en el historial
        </div>
        <PointHistoryList v-else :points="items" />
      </CommonLayoutBentoItem>

    </CommonLayoutBentoGrid>
  </div>
</template>