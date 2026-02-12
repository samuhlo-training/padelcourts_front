<template>
  <!-- ======================================================================= -->
  <!-- █ SECCIÓN: APP SHELL (Estructura principal) -->
  <!-- ======================================================================= -->
  <div class="h-screen w-screen bg-gray-50 flex flex-col overflow-hidden">

    <!-- --------------------------------------------------------------------- -->
    <!-- █ CABECERA (Altura fija, sin rotación) -->
    <!-- --------------------------------------------------------------------- -->
    <CommonHeader class="flex-none z-40 relative" />

    <!-- --------------------------------------------------------------------- -->
    <!-- █ CUERPO: SIDEBAR + CONTENIDO -->
    <!-- --------------------------------------------------------------------- -->
    <div class="flex flex-1 overflow-hidden relative">
      <!-- Sidebar: Ancho fijo, altura completa de este contenedor flex -->
      <CommonAppSidebar class="flex-none w-52 z-30 relative" />

      <!-- Contenido Principal: Toma el espacio restante -->
      <main class="flex-1 h-full overflow-y-auto lg:overflow-hidden flex flex-col p-8 relative scrollbar-hide">
        <slot />
      </main>
    </div>
  </div>
</template>
