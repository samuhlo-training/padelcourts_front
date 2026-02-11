<script setup lang="ts">
/**
 * █ [PAGE] :: HISTORY
 * =====================================================================
 * DESC:   List of past matches with details.
 * STATUS: MOCK
 * =====================================================================
 */
import MatchHistoryCard from '~/components/match/history/MatchHistoryCard.vue'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Historial | Padel',
})

// =============================================================================
// █ DATA: MOCK
// =============================================================================
const historyMatches = ref([
 {
    id: 1,
    type: 'Partido amistoso',
    date: '12/02/2026',
    time: '17:00',
    duration: '1h 30m',
    court: 'Pista 1',
    teamA: {
      name: 'Team A',
      players: ['Alex Galan', 'Fede Chingoto'],
      sets: 2,
    },
    teamB: {
      name: 'Team B',
      players: ['Arturo Coello', 'Agustin Tapia'],
      sets: 1,
    },
    score: '6-4 3-6 6-2',
  },
  {
    id: 2,
    type: 'Torneo Mensual',
    date: '11/02/2026',
    time: '19:30',
    duration: '1h 15m',
    court: 'Pista 3',
    teamA: {
      name: 'Los Primos',
      players: ['Juan Lebron', 'Paquito Navarro'],
      sets: 0,
    },
    teamB: {
      name: 'Padel Bros',
      players: ['Momo Gonzalez', 'Sanyo Gutierrez'],
      sets: 2,
    },
    score: '4-6 5-7',
  },
  {
    id: 3,
    type: 'Clase',
    date: '10/02/2026',
    time: '10:00',
    duration: '55m',
    court: 'Pista 2',
    teamA: {
      name: 'Alumno 1',
      players: ['Pepe'],
      sets: 1,
    },
    teamB: {
      name: 'Monitor',
      players: ['Coach'],
      sets: 1,
    },
    score: '6-2 2-6',
  },
    {
    id: 4,
    type: 'Partido amistoso',
    date: '09/02/2026',
    time: '18:00',
    duration: '1h 45m',
    court: 'Pista 1',
    teamA: {
      name: 'Reyes de la Pista',
      players: ['Bela', 'Yanguas'],
      sets: 2,
    },
    teamB: {
      name: 'Aspirantes',
      players: ['Stupa', 'Di Nenno'],
      sets: 1,
    },
    score: '7-6 6-7 6-4',
  },
  {
    id: 5,
    type: 'Partido amistoso',
    date: '08/02/2026',
    time: '12:00',
    duration: '1h 10m',
    court: 'Pista 4',
    teamA: {
      name: 'Team C',
      players: ['Chingotto', 'Tello'],
      sets: 2,
    },
    teamB: {
      name: 'Team D',
      players: ['Lebron', 'Galan'],
      sets: 0,
    },
    score: '6-1 6-3',
  },
])

</script>

<template>
  <div class="flex flex-col h-full">
    <!-- HEADER -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-brand-dark tracking-tight ml-8">
        HISTORIAL
      </h1>
    </div>

    <!-- CONTENT: LIST -->
    <!-- We use a scrollable container for the list -->
    <div class="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide pb-20">
      <MatchHistoryCard 
        v-for="match in historyMatches" 
        :key="match.id" 
        :match="match" 
      />
    </div>
  </div>
</template>
