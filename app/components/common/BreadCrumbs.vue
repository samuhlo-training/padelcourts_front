<script setup lang="ts">
import { PhArrowLeft, PhCaretRight } from '@phosphor-icons/vue'

interface BreadcrumbItem {
  label: string
  to?: string
}

const props = defineProps<{
  /**
   * Optional path for the back button
   */
  backTo?: string
  /**
   * list of breadcrumb items
   */
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <div class="mb-8 flex items-center gap-3">
    <!-- Back Button -->
    <NuxtLink
      v-if="backTo"
      :to="backTo"
      class="text-gray-400 hover:text-brand-dark transition-colors"
    >
      <PhArrowLeft :size="20" weight="bold" />
    </NuxtLink>

    <!-- Breadcrumb Items -->
    <h1 class="text-3xl font-thin text-brand-dark tracking-tight flex items-center">
      <template v-for="(item, index) in items" :key="index">
        <!-- Item with Link -->
        <NuxtLink 
          v-if="item.to" 
          :to="item.to"
          class="hover:text-brand-primary transition-colors"
          :class="{ 'font-bold': index === items.length - 1 }"
        >
          {{ item.label }}
        </NuxtLink>
        
        <!-- Item without Link -->
        <span v-else :class="{ 'font-bold': index === items.length - 1 }">
          {{ item.label }}
        </span>

        <!-- Separator -->
        <span v-if="index < items.length - 1" class="mx-1.5"><PhCaretRight :size="20" weight="bold" color="gray" /></span>
      </template>
    </h1>

    <!-- Right Side Actions (e.g. Status) -->
    <div class="ml-auto">
      <slot name="action" />
    </div>
  </div>
</template>
