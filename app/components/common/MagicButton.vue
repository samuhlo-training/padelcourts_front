<script setup lang="ts">
/**
 * █ [UI_ATOM] :: MAGIC_BUTTON
 * =====================================================================
 * DESC:   CTA button "DO THE MAGIC >". Lime bg, bottom of sidebar.
 *         Uses PhCaretRight from @phosphor-icons/vue.
 * STATUS: STABLE
 * =====================================================================
 */
import { PhCaretRight } from '@phosphor-icons/vue'
</script>

<template>
  <button
    class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-lime text-brand-dark text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 hover:bg-brand-lime-hover hover:shadow-md active:scale-95"
  >
    DO THE MAGIC
    <PhCaretRight :size="14" weight="bold" />
  </button>
</template>
