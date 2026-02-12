<script setup lang="ts">
/**
 * █ [PÁGINA] :: HOME_REDIRECT
 * =====================================================================
 * DESC:   Redirige a /courts como página de inicio predeterminada.
 * STATUS: ESTABLE (STABLE)
 * =====================================================================
 */
definePageMeta({
  layout: 'default',
})

// REDIRIGIR -> Courts es el punto de entrada principal
if (import.meta.server) {
  await navigateTo('/courts', { redirectCode: 302 })
}

onMounted(() => {
  navigateTo('/courts')
})
</script>

<template>
  <div />
</template>
