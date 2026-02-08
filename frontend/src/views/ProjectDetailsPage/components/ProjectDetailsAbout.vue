<script setup lang="ts">
import type { Project } from '@/types/project';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-bold uppercase tracking-tight text-indigo-400">
      Sobre o Projeto
    </h2>
    <p class="text-gray-400 text-lg leading-relaxed">
      {{ project?.description }}
    </p>
  </section>
</template>
