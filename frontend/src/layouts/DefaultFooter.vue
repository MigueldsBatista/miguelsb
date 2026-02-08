<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>

<template>
  <footer class="fixed bottom-0 left-0 w-full p-4 border-t border-neutral-200 dark:border-neutral-900 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl z-50 flex justify-between items-center text-[9px] md:text-[10px] font-mono text-gray-600 uppercase tracking-widest px-6 md:px-10">
    <div class="flex items-center gap-6">
      <span class="flex items-center gap-1.5"><div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> API Online</span>
      <span class="flex items-center gap-1.5">
        <Icon
          icon="heroicons:device-phone-mobile-20-solid"
          class="w-3 h-3"
        /> Mobile Optimized</span>
    </div>
    <div class="flex items-center gap-2">
      <span class="hidden md:inline italic text-neutral-700 lowercase">Last update: 2026.01.16</span>
      <span class="text-indigo-500 font-bold">V1.0</span>
    </div>
  </footer>
</template>
