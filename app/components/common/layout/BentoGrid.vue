<script setup lang="ts">
const props = defineProps({
  cols: { type: Number, default: 3 },
  rows: { type: Number, default: 3 },
})

const gridColsClass = computed(() => {
  const map: Record<number, string> = {
    0: '',
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
    7: 'lg:grid-cols-7',
    8: 'lg:grid-cols-8',
    9: 'lg:grid-cols-9',
    10: 'lg:grid-cols-10',
    11: 'lg:grid-cols-11',
    12: 'lg:grid-cols-12',
  }
  return map[props.cols] ?? 'lg:grid-cols-3'
})

const gridRowsClass = computed(() => {
   const map: Record<number, string> = {
    0: '',
    1: 'lg:grid-rows-1',
    2: 'lg:grid-rows-2',
    3: 'lg:grid-rows-3',
    4: 'lg:grid-rows-4',
    5: 'lg:grid-rows-5',
    6: 'lg:grid-rows-6',
    7: 'lg:grid-rows-7',
    8: 'lg:grid-rows-8',
    9: 'lg:grid-rows-9',
    10: 'lg:grid-rows-10',
    11: 'lg:grid-rows-11',
    12: 'lg:grid-rows-12',
  }
  return map[props.rows] ?? 'lg:grid-rows-3'
})
</script>

<template>
  <div 
    class="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto lg:flex-1 lg:min-h-0"
    :class="[gridColsClass, gridRowsClass]"
  >
    <slot />
  </div>
</template>