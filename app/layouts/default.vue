<template>
  <!-- ======================================================================= -->
  <!-- █ SECTION: APP SHELL -->
  <!-- ======================================================================= -->
  <div class="h-screen w-screen bg-gray-50 flex flex-col overflow-hidden">

    <!-- --------------------------------------------------------------------- -->
    <!-- █ HEADER (Fixed height, no rotation) -->
    <!-- --------------------------------------------------------------------- -->
    <CommonHeader class="flex-none z-40 relative" />

    <!-- --------------------------------------------------------------------- -->
    <!-- █ BODY: SIDEBAR + CONTENT -->
    <!-- --------------------------------------------------------------------- -->
    <div class="flex flex-1 overflow-hidden relative">
      <!-- Sidebar: Fixed width, full height of this flex container -->
      <CommonAppSidebar class="flex-none w-52 z-30 relative" />

      <!-- Main Content: Takes remaining space -->
      <main class="flex-1 h-full overflow-y-auto lg:overflow-hidden flex flex-col p-8 relative scrollbar-hide">
        <slot />
      </main>
    </div>
  </div>
</template>
