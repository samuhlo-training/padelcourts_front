<script setup lang="ts">
defineProps({
  // Permite que una caja ocupe 2 o 3 columnas (ej: el Marcador Principal)
  cols: { type: Number, default: 1 }, 
  // Permite que una caja sea más alta
  rows: { type: Number, default: 1 },
  // Título opcional de la caja (ej: "Live Commentary")
  title: { type: String, default: '' }
})
</script>

<template>
  <div 
    class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col transition-all hover:shadow-md"
    :class="[
      cols === 2 ? 'md:col-span-2' : '',
      cols === 3 ? 'md:col-span-3' : '',
      rows === 2 ? 'row-span-2' : ''
    ]"
  >
    <h3 v-if="title" class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
      {{ title }}
    </h3>

    <div class="flex-1">
      <slot />
    </div>
  </div>
</template>