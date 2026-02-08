<script setup lang="ts">
import type { Project } from '@/types/project';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="relative z-10 flex flex-wrap gap-2">
    <span
      v-for="tech in project.tech_stack"
      :key="tech"
      class="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-[10px] md:text-xs font-mono text-gray-600 dark:text-gray-300 border border-neutral-200 dark:border-neutral-700 group-hover:border-indigo-500/30 transition-colors"
    >
      {{ tech }}
    </span>
  </div>
</template>
