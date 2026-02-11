<script setup lang="ts">
/**
 * █ [UI_LAYOUT] :: APP_SIDEBAR
 * =====================================================================
 * DESC:   Fixed sidebar navigation. Contains 4 nav items + MagicButton.
 * STATUS: STABLE
 * =====================================================================
 */

// =============================================================================
// █ CORE: NAVIGATION ITEMS
// =============================================================================
const navItems = [
  { label: 'PISTAS', to: '/courts', icon: 'grid' },
  { label: 'HISTORIAL', to: '/history', icon: 'list' },

]
</script>

<template>
  <!-- ======================================================================= -->
  <!-- █ SECTION: SIDEBAR -->
  <!-- ======================================================================= -->
  <aside class="w-52 bg-white border-r border-gray-100 flex flex-col h-full">

    <!-- --------------------------------------------------------------------- -->
    <!-- █ NAV LINKS -->
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
    <!-- █ BOTTOM ACTION -->
    <!-- --------------------------------------------------------------------- -->
    <div class="p-4">
      <CommonMagicButton />
    </div>
  </aside>
</template>
