<script setup lang="ts">
/**
 * █ [PAGE] :: COURTS_INDEX
 * =====================================================================
 * DESC:   Main courts overview. Bento grid with occupied/free sections.
 *         Uses mock data until backend integration.
 * STATUS: WIP
 * =====================================================================
 */
import type { Court } from '~/types'

// =============================================================================
// █ CORE: PAGE META
// =============================================================================
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Pistas | Padel',
})

// =============================================================================
// █ DATA: MOCK COURTS
// =============================================================================
const courts = ref<Court[]>([
  {
    id: 1,
    name: 'PISTA 1',
    status: 'occupied',
    currentMatch: { type: 'Partido amistoso', elapsedTime: '00:43:45', isLive: true },
  },
  {
    id: 3,
    name: 'PISTA 3',
    status: 'occupied',
    currentMatch: { type: 'Partido amistoso', elapsedTime: '01:23:45', isLive: true },
  },
  {
    id: 6,
    name: 'PISTA 6',
    status: 'occupied',
    currentMatch: { type: 'Partido amistoso', elapsedTime: '00:22:45', isLive: true },
  },
  { id: 2, name: 'PISTA 2', status: 'free', lastMatch: { type: 'Partido amistoso' } },
  { id: 4, name: 'PISTA 2', status: 'free', lastMatch: { type: 'Partido amistoso' } },
  { id: 5, name: 'PISTA 2', status: 'free', lastMatch: { type: 'Partido amistoso' } },
  { id: 7, name: 'PISTA 2', status: 'free', lastMatch: { type: 'Partido amistoso' } },
  { id: 8, name: 'PISTA 2', status: 'free', lastMatch: { type: 'Partido amistoso' } },
])

// =============================================================================
// █ COMPUTED: FILTERED LISTS
// =============================================================================
const occupiedCourts = computed(() => courts.value.filter(c => c.status === 'occupied'))
const freeCourts = computed(() => courts.value.filter(c => c.status === 'free'))
</script>

<template>
  <!-- ======================================================================= -->
  <!-- █ SECTION: PAGE TITLE -->
  <!-- ======================================================================= -->
  <div class="mb-8">
    <h1 class="text-3xl font-black text-brand-dark tracking-tight text-center">
      PISTAS
    </h1>
  </div>

  <!-- ======================================================================= -->
  <!-- █ SECTION: BENTO GRID -->
  <!-- ======================================================================= -->
  <CommonLayoutBentoGrid class="!grid-cols-1 lg:!grid-cols-2">

    <!-- --------------------------------------------------------------------- -->
    <!-- █ OCCUPIED COURTS -->
    <!-- --------------------------------------------------------------------- -->
    <CommonLayoutBentoItem title="PISTAS OCUPADAS">
      <div class="space-y-3">
        <CourtsCourtStatusCard
          v-for="court in occupiedCourts"
          :key="court.id"
          :court="court"
        />

        <!-- EMPTY STATE -->
        <p v-if="occupiedCourts.length === 0" class="text-sm text-gray-400 text-center py-8">
          No hay pistas ocupadas
        </p>
      </div>
    </CommonLayoutBentoItem>

    <!-- --------------------------------------------------------------------- -->
    <!-- █ FREE COURTS -->
    <!-- --------------------------------------------------------------------- -->
    <CommonLayoutBentoItem title="PISTAS LIBRES">
      <div class="space-y-3">
        <CourtsCourtStatusCard
          v-for="court in freeCourts"
          :key="court.id"
          :court="court"
        />

        <!-- EMPTY STATE -->
        <p v-if="freeCourts.length === 0" class="text-sm text-gray-400 text-center py-8">
          Todas las pistas están ocupadas
        </p>
      </div>
    </CommonLayoutBentoItem>

  </CommonLayoutBentoGrid>
</template>
