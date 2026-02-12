<script setup lang="ts">
/**
 * █ [UI_LAYOUT] :: APP_SIDEBAR
 * =====================================================================
 * DESC:   Navegación lateral fija. Contiene 4 elementos de navegación + MagicButton.
 * STATUS: ESTABLE (STABLE)
 * =====================================================================
 */

// =============================================================================
// █ CORE: ELEMENTOS DE NAVEGACIÓN
// =============================================================================
const navItems = [
  { label: 'PISTAS', to: '/courts', icon: 'grid' },
  { label: 'HISTORIAL', to: '/history', icon: 'list' },

]
</script>

<template>
  <!-- ======================================================================= -->
  <!-- █ SECCIÓN: BARRA LATERAL (SIDEBAR) -->
  <!-- ======================================================================= -->
  <aside class="w-52 bg-white border-r border-gray-100 flex flex-col h-full">

    <!-- --------------------------------------------------------------------- -->
    <!-- █ ENLACES DE NAVEGACIÓN -->
    <!-- --------------------------------------------------------------------- -->
    <nav class="flex-1 p-4 space-y-1">
      <CommonSidebarButton
        v-for="item in navItems"
        :key="item.to"
        :label="item.label"
        :to="item.to"
        :icon="item.icon"
      />
    </nav>

    <!-- --------------------------------------------------------------------- -->
    <!-- █ ACCIÓN INFERIOR -->
    <!-- --------------------------------------------------------------------- -->
    <div class="p-4">
      <CommonMagicButton />
    </div>
  </aside>
</template>
