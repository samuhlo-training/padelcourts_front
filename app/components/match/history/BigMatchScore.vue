<script setup lang="ts">
/**
 * █ [UI_MOLECULA] :: BIG_MATCH_SCORE
 * =====================================================================
 * DESC:   Muestra la puntuación detallada de un partido pasado.
 *         Compone BigSetScore y DurationTimer.
 * STATUS: ESTABLE (STABLE)
 * =====================================================================
 */
import BigSetScore from './BigSetScore.vue'
import DurationTimer from './DurationTimer.vue'

defineProps<{
  scoreA: number
  scoreB: number
  sets: Array<{ set: number, a: number, b: number }>
  duration: string
}>()
</script>

<template>
  <div class="flex items-center gap-12 w-full max-w-4xl justify-center">
    
    <!-- GRAN PUNTUACIÓN -->
    <div class="flex items-center gap-6">
       <span class="text-[8rem] font-black text-brand-lime leading-none">{{ scoreA }}</span>
       <span class="text-4xl font-black text-brand-dark h-4 w-12 bg-brand-dark rounded-full"></span>
       <span class="text-[8rem] font-black text-brand-dark leading-none">{{ scoreB }}</span>
    </div>

    <!-- PUNTUACIONES DE LOS SETS -->
    <div class="flex flex-col justify-center space-y-3 pl-12 border-l border-gray-100">
      <BigSetScore 
        v-for="set in sets" 
        :key="set.set"
        :setNumber="set.set"
        :scoreA="set.a"
        :scoreB="set.b"
      />
    </div>

    <!-- DURACIÓN -->
    <div class="ml-auto">
       <DurationTimer :duration="duration" />
    </div>
   </div>
</template>
