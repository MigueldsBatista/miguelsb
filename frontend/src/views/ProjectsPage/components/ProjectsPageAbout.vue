<script setup lang="ts">
import type { Project } from '@/types/project';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <p class="relative z-10 text-gray-600 dark:text-gray-400 text-sm md:text-base mb-8 max-w-3xl leading-relaxed">
    {{ project.description }}
  </p>
</template>
