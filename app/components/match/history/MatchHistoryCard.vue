<script setup lang="ts">
/**
 * █ [UI_MOLECULA] :: MATCH_HISTORY_CARD
 * =====================================================================
 * DESC:   Tarjeta que muestra el resumen de un partido pasado.
 *         Muestra fecha, pista, equipos, puntuación y duración.
 * STATUS: WIP
 * =====================================================================
 */

// =============================================================================
// █ CORE: PROPS
// =============================================================================
defineProps<{
  match: {
    id: string | number
    date: string
    time: string
    court: string
    type: string
    duration: string,
    status: string,
    teamA: {
      name: string
      players: string[]
      sets: number
    }
    teamB: {
      name: string
      players: string[]
      sets: number
    }
    score: string // e.g., "6-4 3-6 6-2"
  }
}>()
</script>

<template>
  <NuxtLink 
    :to="`/history/match/${match.id}`"
    class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row items-center gap-6"
  >
    
    <!-- IZQUIERDA: INFO DEL PARTIDO (ID Y TIPO) -->
    <div class="flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-1 min-w-[120px]">
      <span class="text-brand-lime font-black text-xl">#{{ String(match.id).padStart(2, '0') }}</span>
      <span class="text-xs font-bold uppercase tracking-wider text-gray-400">{{ match.type }}</span>
    </div>
    <span :class="match.status === 'canceled' ? 'text-red-300' : 'text-brand-lime'" class="text-xs font-bold uppercase tracking-wider">{{ match.status }}</span>

    <!-- CENTRO: EQUIPOS Y PUNTUACIÓN -->
    <div class="flex-1 flex flex-col md:flex-row items-center justify-between w-full gap-4">
      
      <!-- EQUIPO A -->
      <div class="flex flex-col items-center md:items-end gap-1 flex-1">
        <span class="font-bold text-brand-dark text-lg">{{ match.teamA.name }}</span>
        <!-- Opcional: Mostrar jugadores si es necesario, quizás más pequeño -->
        <!-- <div class="text-xs text-gray-400">{{ match.teamA.players.join(' / ') }}</div> -->
      </div>

      <!-- MARCADOR -->
      <div class="flex items-center gap-4 px-6 py-2 bg-gray-50 rounded-xl">
        <span 
          class="text-2xl font-black"
          :class="match.teamA.sets > match.teamB.sets ? 'text-brand-lime' : 'text-gray-300'"
        >
          {{ match.teamA.sets }}
        </span>
        <span class="text-gray-300 font-bold">-</span>
        <span 
          class="text-2xl font-black"
          :class="match.teamB.sets > match.teamA.sets ? 'text-brand-lime' : 'text-gray-300'"
        >
          {{ match.teamB.sets }}
        </span>
      </div>

      <!-- EQUIPO B -->
      <div class="flex flex-col items-center md:items-start gap-1 flex-1">
        <span class="font-bold text-brand-dark text-lg">{{ match.teamB.name }}</span>
        <!-- <div class="text-xs text-gray-400">{{ match.teamB.players.join(' / ') }}</div> -->
      </div>

    </div>

    <!-- DERECHA: META INFO (PISTA Y HORA) -->
    <div class="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-1 min-w-[140px] border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-between md:justify-center">
      <div class="flex items-center gap-2">
         <span class="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
          {{ match.court }}
        </span>
      </div>
      <div class="text-right flex flex-col">
        <span class="text-sm font-bold text-brand-dark">{{ match.time }}</span>
        <span class="text-xs text-gray-400">{{ match.date }}</span>
      </div>
    </div>

  </NuxtLink>
</template>
