<script setup lang="ts">
/**
 * █ [COMPONENT] :: POINT HISTORY LIST
 * =====================================================================
 * DESC:   Timeline of points for a player.
 *         Green = Winner, Red = Error/Lost.
 * PROPS:  points (PointHistoryItem[])
 * STATUS: MOCK
 * =====================================================================
 */

interface PointHistoryItem {
  id: number
  stroke: string // 'Drive', 'Smash', etc.
  timestamp: string // "01'", "03'", etc.
  isWinner: boolean // true = Green, false = Red underline/style
}

defineProps<{
  points: PointHistoryItem[]
}>()

</script>

<template>
  <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full flex flex-col">
    
    <!-- HEADER -->
    <h3 class="text-xl font-bold text-brand-dark mb-6">Historial de puntos</h3>

    <!-- LIST -->
    <!-- Grid layout for badges? Or just a list? Design looks like a vertical list/flow -->
    <div class="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      <div class="space-y-3">
        <div 
          v-for="point in points" 
          :key="point.id"
          class="flex items-center justify-between px-4 py-3 rounded-xl transition-all"
          :class="[
            point.isWinner 
              ? 'bg-brand-lime text-brand-dark border border-brand-lime' 
              : 'bg-white text-brand-dark border-b-2 border-brand-red border-t border-l border-r border-gray-100' // 'Red underline' look
          ]"
        >
          <span class="font-bold text-sm">{{ point.stroke }}</span>
          <span class="font-mono text-xs opacity-70">{{ point.timestamp }}</span>
        </div>
        
        <!-- EMPTY STATE -->
        <div v-if="points.length === 0" class="text-center text-gray-400 py-10">
          No hay puntos registrados aún.
        </div>
      </div>
    </div>

  </div>
</template>
