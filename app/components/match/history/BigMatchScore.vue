<script setup lang="ts">
/**
 * █ [UI_MOLECULE] :: BIG_MATCH_SCORE
 * =====================================================================
 * DESC:   Displays the detailed score of a past match.
 *         Composes BigSetScore and DurationTimer.
 * STATUS: STABLE
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
    
    <!-- BIG SCORE -->
    <div class="flex items-center gap-6">
       <span class="text-[8rem] font-black text-brand-lime leading-none">{{ scoreA }}</span>
       <span class="text-4xl font-black text-brand-dark h-4 w-12 bg-brand-dark rounded-full"></span>
       <span class="text-[8rem] font-black text-brand-dark leading-none">{{ scoreB }}</span>
    </div>

    <!-- SET SCORES -->
    <div class="flex flex-col justify-center space-y-3 pl-12 border-l border-gray-100">
      <BigSetScore 
        v-for="set in sets" 
        :key="set.set"
        :setNumber="set.set"
        :scoreA="set.a"
        :scoreB="set.b"
      />
    </div>

    <!-- DURATION -->
    <div class="ml-auto">
       <DurationTimer :duration="duration" />
    </div>
   </div>
</template>
