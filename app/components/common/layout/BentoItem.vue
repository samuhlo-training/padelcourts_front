<script setup lang="ts">
const props = defineProps({
  // Permite que una caja ocupe 2 o 3 columnas (ej: el Marcador Principal)
  cols: { type: Number, default: 1 }, 
  // Permite que una caja sea más alta
  rows: { type: Number, default: 1 },
  // Título opcional de la caja (ej: "Comentarios en vivo")
  title: { type: String, default: '' },
  // Variante de estilo: 'card' (blanco, padding) o 'raw' (sin estilos, para tarjetas custom)
  variant: { type: String, default: 'card' } 
})
const spanColsClass = computed(() => {
  const map: Record<number, string> = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
  }
  return map[props.cols] ?? ''
})

const spanRowsClass = computed(() => {
  const map: Record<number, string> = {
    1: 'lg:row-span-1',
    2: 'lg:row-span-2',
    3: 'lg:row-span-3',
    4: 'lg:row-span-4',
    5: 'lg:row-span-5',
    6: 'lg:row-span-6',
  }
  return map[props.rows] ?? ''
})
</script>

<template>
  <div 
    class="flex flex-col transition-all h-full overflow-hidden hover:z-10"
    :class="[
      spanColsClass,
      spanRowsClass,
      cols >= 2 ? 'md:col-span-2' : '',
      rows === 4 ? 'lg:row-span-full' : '',
      variant === 'card' ? 'bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md' : '',
      variant === 'raw' ? 'rounded-2xl  hover:shadow-md' : ''
    ]"
  >
    <h3 v-if="title" class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 shrink-0">
      {{ title }}
    </h3>

    <div class="flex-1 overflow-y-auto min-h-0 scrollbar-hide">
      <slot />
    </div>
  </div>
</template>