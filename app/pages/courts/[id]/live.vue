<script setup lang="ts">
/**
 * █ [PÁGINA] :: COURT_LIVE
 * =====================================================================
 * DESC:   Vista de partido en vivo para una pista específica. Diseño de cuadrícula Bento con
 *         MatchLiveCard (2 columnas), LiveCommentaryCard y PlayerMiniCard.
 *         Se conecta a WebSocket a través de activeMatchStore.
 * STATUS: INTEGRADO (INTEGRATED)
 * =====================================================================
 */

import MatchLiveCard from '~/components/match/live/MatchLiveCard.vue'
import LiveCommentaryCard from '~/components/match/live/LiveCommentaryCard.vue'
import PlayerMiniCard from '~/components/player/summary/PlayerMiniCard.vue'
import { useActiveMatchStore } from '~/stores/activeMatch.store'
import { storeToRefs } from 'pinia'

// =============================================================================
// █ CORE: META DE LA PÁGINA
// =============================================================================
const route = useRoute()
const courtId = computed(() => route.params.id)

definePageMeta({
  layout: 'default',
})

useHead({
  title: computed(() => `Pista ${courtId.value} — Live | Padel`),
})

// =============================================================================
// █ DATOS: INTEGRACIÓN CON LA TIENDA (STORE)
// =============================================================================
const store = useActiveMatchStore()
const courtsStore = useCourtsStore()
const { match, commentary, isConnected } = storeToRefs(store)

/** Resolver el activeMatchId para esta pista desde la tienda de pistas */
const activeMatchId = computed(() => {
  const court = courtsStore.courts.find((c) => c.id === Number(courtId.value))
  return court?.activeMatchId ?? null
})

onMounted(() => {
  const matchId = activeMatchId.value
  if (matchId) {
    store.initLiveMatch(matchId)
  }
})

onUnmounted(() => {
  const matchId = activeMatchId.value
  if (matchId) {
    store.leaveMatch(matchId)
  }
})

const mvpPlayer = computed(() => {
  if (!match.value?.stats?.length) {
    return {
      name: 'Esperando datos...',
      points: 0,
      errors: 0,
    }
  }

  // Encontrar al jugador con más puntos ganados (pointsWon)
  // Sabemos que match.value está definido y stats tiene al menos 1 elemento debido a la comprobación anterior
  const stats = match.value!.stats!
  const firstPlayer = stats[0]
  
  if (!firstPlayer) {
    return { name: 'N/A', points: 0, errors: 0 }
  }

  const bestPlayer = stats.reduce((prev, current) => {
    return (current.pointsWon > prev.pointsWon) ? current : prev
  }, firstPlayer)

  return {
    name: bestPlayer.playerName,
    points: bestPlayer.pointsWon,
    errors: bestPlayer.unforcedErrors,
  }
})

</script>

<template>
  <!-- ======================================================================= -->
  <!-- █ SECCIÓN: MIGAS DE PAN (BREADCRUMB) -->
  <!-- ======================================================================= -->
  <CommonBreadCrumbs 
    back-to="/courts"
    :items="[
      { label: 'PISTAS' }, 
      { label: `PISTA ${courtId}` }
    ]"
  >
    <template #action>
      <span v-if="match?.isLive && isConnected" class="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded animate-pulse">
        EN VIVO
      </span>
      <span v-else-if="match && !match.isLive" class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded">
        FINALIZADO
      </span>
      <span v-else class="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
        OFFLINE
      </span>
    </template>
  </CommonBreadCrumbs>

  <!-- ======================================================================= -->
  <!-- █ SECCIÓN: CUADRÍCULA BENTO (3 columnas) -->
  <!-- ======================================================================= -->
  <CommonLayoutBentoGrid v-if="match" :cols="3" :rows="3">

    <!-- ------------------------------------------------------------------- -->
    <!-- █ TARJETA DE PARTIDO EN VIVO (2 columnas * 3 filas) -->
    <!-- ------------------------------------------------------------------- -->
    <CommonLayoutBentoItem :cols="2" :rows="3">
      <MatchLiveCard :match="match" />
    </CommonLayoutBentoItem>

    <!-- ------------------------------------------------------------------- -->
    <!-- █ COMENTARIOS EN VIVO (1 columna * 2 filas) -->
    <!-- ------------------------------------------------------------------- -->
    <CommonLayoutBentoItem :rows="2">
      <LiveCommentaryCard :entries="commentary"  />
    </CommonLayoutBentoItem>

    <!-- ------------------------------------------------------------------- -->
    <!-- █ TARJETA DE JUGADOR MVP (1 columna * 1 fila) -->
    <!-- ------------------------------------------------------------------- -->
    <CommonLayoutBentoItem variant="raw">
      <PlayerMiniCard :player="mvpPlayer" variant="mvp" />
    </CommonLayoutBentoItem>

  </CommonLayoutBentoGrid>

  <!-- ESTADO DE CARGA -->
  <div v-else class="flex items-center justify-center p-12 text-gray-400 font-medium">
    <div class="animate-spin mr-3 h-5 w-5 border-2 border-brand-lime border-t-transparent rounded-full"></div>
    Conectando al partido...
  </div>
</template>
