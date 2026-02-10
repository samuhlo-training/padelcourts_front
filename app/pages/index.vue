<script setup lang="ts">
/**
 * █ [PAGE] :: HOME_REDIRECT
 * =====================================================================
 * DESC:   Redirects to /courts as the default landing page.
 * STATUS: STABLE
 * =====================================================================
 */
definePageMeta({
  layout: 'default',
})

// REDIRECT -> Courts is the main entry point
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
