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
// =============================================================================
// █ DATA: STORE
// =============================================================================
const courtsStore = useCourtsStore()
const { courts } = storeToRefs(courtsStore)

// Initialize data via composable
const { init } = useCourtData()

// Initialize store/data on mount
onMounted(() => {
  init()
})

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
    <h1 class="text-3xl font-black text-brand-dark tracking-tight ml-8">
      PISTAS
    </h1>
  </div>

  <!-- ======================================================================= -->
  <!-- █ SECTION: BENTO GRID -->
  <!-- ======================================================================= -->
  <CommonLayoutBentoGrid :cols="4" :rows="2">

    <!-- --------------------------------------------------------------------- -->
    <!-- █ OCCUPIED COURTS -->
    <!-- --------------------------------------------------------------------- -->
    <CommonLayoutBentoItem title="PISTAS OCUPADAS" :cols="2" :rows="2">
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
    <CommonLayoutBentoItem title="PISTAS LIBRES" :cols="2" :rows="2">
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
