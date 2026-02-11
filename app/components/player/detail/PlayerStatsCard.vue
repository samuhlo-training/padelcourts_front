<script setup lang="ts">
/**
 * █ [COMPONENT] :: PLAYER STATS CARD
 * =====================================================================
 * DESC:   Detailed stats for a player in a specific match.
 *         Shows breakdown of strokes (winners/errors).
 * PROPS:  player (PlayerMatchStats), teamName (string)
 * STATUS: MOCK
 * =====================================================================
 */

interface StrokeStat {
  name: string
  winners: number
  errors: number
}

interface PlayerDetails {
  id: number
  name: string
  teamName: string
  country: string // 'ES' | 'AR' | etc.
  totalPoints: number
  totalErrors: number
  strokes: StrokeStat[]
}

const props = defineProps<{
  player: PlayerDetails
}>()

// Helper for row highlighting (optional, maybe zebra striping or just clean white)
</script>

<template>
  <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col h-full">
    
    <!-- HEADER -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h2 class="text-2xl font-bold text-brand-dark leading-tight">{{ player.name }}</h2>
        <p class="text-gray-500 font-medium">Estadisticas del partido</p>
      </div>
      <div class="text-right">
        <div class="text-sm font-semibold text-gray-500">{{ player.teamName }}</div>
        <div class="text-xl font-black text-brand-dark tracking-wide">{{ player.country }}</div>
      </div>
    </div>

    <!-- TABLE -->
    <div class="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      <table class="w-full text-left border-collapse">
        <!-- THEAD (Hidden visually based on design but semantic) -->
        <thead>
          <tr class="text-xs text-gray-400 font-bold uppercase border-b border-gray-100">
            <th class="py-2 font-normal">Golpe</th>
            <th class="py-2 text-center text-brand-green">Puntos</th> <!-- Visual cue color -->
            <th class="py-2 text-center text-brand-red">Fallos</th>   <!-- Visual cue color -->
          </tr>
        </thead>
        <tbody class="text-brand-dark">
          <tr v-for="(stat, idx) in player.strokes" :key="idx" class="group hover:bg-gray-50 transition-colors">
            <td class="py-3 font-medium text-sm border-b border-gray-50 group-last:border-0">
              {{ stat.name }}
            </td>
            <td class="py-3 text-center text-brand-green font-bold border-b border-gray-50 group-last:border-0">
              {{ stat.winners }}
            </td>
            <td class="text-center text-brand-red font-bold border-b border-gray-50 group-last:border-0 py-3">
              {{ stat.errors }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- FOOTER: TOTALS -->
    <div class="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-12">
      <div class="flex flex-col items-center">
        <span class="text-3xl font-black text-brand-green">{{ player.totalPoints }}</span>
        <span class="text-sm font-bold text-gray-400 uppercase tracking-wider">Puntos</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-3xl font-black text-brand-red">{{ player.totalErrors }}</span>
        <span class="text-sm font-bold text-gray-400 uppercase tracking-wider">Fallos</span>
      </div>
    </div>

  </div>
</template>
