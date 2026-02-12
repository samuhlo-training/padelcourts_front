<script setup lang="ts">
/**
 * █ [PÁGINA] :: COURTS_INDEX
 * =====================================================================
 * DESC:   Resumen principal de las pistas. Cuadrícula Bento con secciones ocupadas/libres.
 *         Usa datos simulados hasta la integración con el backend.
 * STATUS: WIP
 * =====================================================================
 */
import type { Court } from '~/types'

// =============================================================================
// █ CORE: META DE LA PÁGINA
// =============================================================================
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Pistas | Padel',
})

// =============================================================================
// █ DATOS: TIENDA (STORE) E INICIALIZACIÓN
// =============================================================================
const courtsStore = useCourtsStore()
const { courts } = storeToRefs(courtsStore)

// INICIALIZACIÓN -> Obtener datos a través del composable
const { init } = useCourtData()

// MONTAJE -> Inicializar la tienda
onMounted(() => {
  init()
})

// =============================================================================
// █ COMPUTED: LISTAS FILTRADAS
// =============================================================================
const occupiedCourts = computed(() => courts.value.filter(c => c.status === 'occupied'))
const freeCourts = computed(() => courts.value.filter(c => c.status === 'free'))
</script>

<template>
  <!-- ======================================================================= -->
  <!-- █ SECCIÓN: TÍTULO DE LA PÁGINA -->
  <!-- ======================================================================= -->
  <div class="mb-8">
    <h1 class="text-3xl font-black text-brand-dark tracking-tight ml-8">
      PISTAS
    </h1>
  </div>

  <!-- ======================================================================= -->
  <!-- █ SECCIÓN: CUADRÍCULA BENTO -->
  <!-- ======================================================================= -->
  <CommonLayoutBentoGrid :cols="4" :rows="2">

    <!-- ------------------------------------------------------------------- -->
    <!-- █ PISTAS OCUPADAS -->
    <!-- ------------------------------------------------------------------- -->
    <CommonLayoutBentoItem title="PISTAS OCUPADAS" :cols="2" :rows="2">
      <div class="space-y-3">
        <CourtsCourtStatusCard
          v-for="court in occupiedCourts"
          :key="court.id"
          :court="court"
        />

        <!-- ESTADO VACÍO -->
        <p v-if="occupiedCourts.length === 0" class="text-sm text-gray-400 text-center py-8">
          No hay pistas ocupadas
        </p>
      </div>
    </CommonLayoutBentoItem>

    <!-- ------------------------------------------------------------------- -->
    <!-- █ PISTAS LIBRES -->
    <!-- ------------------------------------------------------------------- -->
    <CommonLayoutBentoItem title="PISTAS LIBRES" :cols="2" :rows="2">
      <div class="flex flex-col gap-3">
       
          <CourtsCourtStatusCard 
            v-for="court in freeCourts"
            :key="court.id"
            :court="court"
          />
       

        <!-- ESTADO VACÍO -->
        <p v-if="freeCourts.length === 0" class="text-sm text-gray-400 text-center py-8">
          Todas las pistas están ocupadas
        </p>
      </div>
    </CommonLayoutBentoItem>

  </CommonLayoutBentoGrid>
</template>
