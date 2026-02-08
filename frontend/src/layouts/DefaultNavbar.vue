<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { useRoute } from 'vue-router';

const navLinks = [
  { label: 'Home', name: 'home' },
  { label: 'Projetos', name: 'projects' }
];
const baseButton = 'text-[10px] md:text-sm font-medium uppercase tracking-widest transition-all duration-300 relative py-1';
const route = useRoute();
const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>

<template>
  <nav class="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-opacity-80 bg-white dark:bg-neutral-950/80">
    <div class="text-xl font-bold tracking-tighter flex items-center gap-2">
      <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
        M
      </div>
      <span class="text-neutral-900 dark:text-white">MIGUEL.DEV</span>
    </div>

    <div class="flex gap-4 md:gap-8 items-center">
      <RouterLink
        v-for="link in navLinks"
        :key="link.name"
        :to="{ name: link.name }"
        :class="[
          baseButton,
          route.name === link.name
            ? 'text-indigo-500'
            : 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
        ]"
      >
        {{ link.label }}

        <span
          v-if="route.name === link.name"
          class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 animate-in fade-in zoom-in duration-300"
        />
      </RouterLink>

      <button
        class="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
        aria-label="Theme"
        @click="toggleDark()"
      >
        <Icon
          :icon="isDark ? 'heroicons:moon-20-solid' : 'heroicons:sun-20-solid'"
          class="w-5 h-5"
        />
      </button>
    </div>
  </nav>
</template>
