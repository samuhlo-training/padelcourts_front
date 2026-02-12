<script setup lang="ts">
/**
 * █ [UI_MOLECULA] :: MATCH_HISTORY_BIG_CARD
 * =====================================================================
 * DESC:   Tarjeta de resumen de partido grande para la vista detalle del historial.
 *         Compone DateHistory y BigMatchScore.
 * STATUS: INTEGRADO (INTEGRATED)
 * =====================================================================
 */
import DateHistory from './DateHistory.vue'
import BigMatchScore from './BigMatchScore.vue'

defineProps<{
  match: {
    id: string | number
    type: string
    date: string
    timeStart: string
    timeEnd: string
    duration: string
    sets: Array<{ set: number, a: number, b: number }>
    scoreA: number
    scoreB: number
  }
}>()
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <!-- FILA SUPERIOR: ID Y FECHA -->
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center gap-3">
        <span class="text-2xl font-black text-gray-300">#{{ String(match.id).padStart(2, '0') }}</span>
        <h1 class="text-2xl font-black text-brand-dark uppercase tracking-tight">{{ match.type }}</h1>
      </div>
      
      <DateHistory 
        :date="match.date"
        :timeStart="match.timeStart"
        :timeEnd="match.timeEnd"
      />
    </div>

    <!-- CENTRO: MARCADOR -->
    <div class="flex-1 flex flex-col items-center justify-center">
       <BigMatchScore 
         :scoreA="match.scoreA"
         :scoreB="match.scoreB"
         :sets="match.sets"
         :duration="match.duration"
       />
    </div>
  </div>
</template>
