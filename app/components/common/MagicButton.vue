<script setup lang="ts">
/**
 * █ [UI_ATOMO] :: MAGIC_BUTTON
 * =====================================================================
 * DESC:   Botón CTA "DO THE MAGIC >". Fondo lima, parte inferior de la barra lateral.
 *         Usa PhCaretRight de @phosphor-icons/vue.
 * STATUS: ESTABLE (STABLE)
 * =====================================================================
 */
import { PhCaretRight } from '@phosphor-icons/vue'

interface SimulationInfo {
  matchId: number
  courtId: number
  startTime: string
  status: string
}

const COURT_ID = 5
const isSimulating = ref(false)
const currentMatchId = ref<number | null>(null)

/** Sincronizar el estado del botón con el backend al montar (sobrevive a las recargas de página) */
onMounted(async () => {
  try {
    const { activeSimulations } = await $fetch<{ activeSimulations: SimulationInfo[] }>('/api/simulator/status')
    const sim = activeSimulations.find(s => s.courtId === COURT_ID)
    if (sim) {
      currentMatchId.value = sim.matchId
      isSimulating.value = true
    }
  } catch {
    // El backend podría estar caído — dejar el botón en el estado predeterminado
  }
})

async function toggleMagic() {
  const action = isSimulating.value ? 'stop' : 'start'

  try {
    const body = action === 'start'
      ? { courtId: COURT_ID }
      : { matchId: currentMatchId.value }

    const response = await $fetch<{ matchId?: number }>('/api/simulator/' + action, {
      method: 'POST',
      body,
    })

    if (action === 'start') {
      currentMatchId.value = response?.matchId ?? null
    } else {
      currentMatchId.value = null
    }

    isSimulating.value = !isSimulating.value
  } catch (e) {
    console.error('Falló la magia 😢', e)
  }
}
</script>

<template>
  <button
    @click="toggleMagic"
    class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-lime text-brand-dark text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 hover:bg-brand-lime-hover hover:shadow-md active:scale-95"
  >
    {{ isSimulating ? 'DETENER LA MAGIA' : 'HACER LA MAGIA' }}
    <PhCaretRight :size="14" weight="bold" />
  </button>
</template>
