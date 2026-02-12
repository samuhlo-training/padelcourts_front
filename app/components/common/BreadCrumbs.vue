<script setup lang="ts">
import { PhArrowLeft, PhCaretRight } from '@phosphor-icons/vue'

interface BreadcrumbItem {
  label: string
  to?: string
}

const props = defineProps<{
  /**
   * Ruta opcional para el botón de volver
   */
  backTo?: string
  /**
   * lista de elementos de las migas de pan (breadcrumbs)
   */
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <div class="mb-8 flex items-center gap-3">
    <!-- Botón de Volver -->
    <NuxtLink
      v-if="backTo"
      :to="backTo"
      class="text-gray-400 hover:text-brand-dark transition-colors"
    >
      <PhArrowLeft :size="20" weight="bold" />
    </NuxtLink>

    <!-- Elementos de las Migas de Pan -->
    <h1 class="text-3xl font-thin text-brand-dark tracking-tight flex items-center">
      <template v-for="(item, index) in items" :key="index">
        <!-- Elemento con Enlace -->
        <NuxtLink 
          v-if="item.to" 
          :to="item.to"
          class="hover:text-brand-primary transition-colors"
          :class="{ 'font-bold': index === items.length - 1 }"
        >
          {{ item.label }}
        </NuxtLink>
        
        <!-- Elemento sin Enlace -->
        <span v-else :class="{ 'font-bold': index === items.length - 1 }">
          {{ item.label }}
        </span>

        <!-- Separador -->
        <span v-if="index < items.length - 1" class="mx-1.5"><PhCaretRight :size="20" weight="bold" color="gray" /></span>
      </template>
    </h1>

    <!-- Acciones del Lado Derecho (ej. Estado) -->
    <div class="ml-auto">
      <slot name="action" />
    </div>
  </div>
</template>
