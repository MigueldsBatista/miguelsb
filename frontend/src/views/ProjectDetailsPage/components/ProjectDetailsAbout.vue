<script setup lang="ts">
import type { Project } from '@/types/project';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <section v-if="project.description" class="space-y-4">
    <h2 class="text-xl font-bold uppercase tracking-tight text-indigo-400">
      Sobre o Projeto
    </h2>
    <p class="text-gray-400 text-lg leading-relaxed">
      {{ project.description }}
    </p>
  </section>

  <section v-if="project?.details?.objective" class="space-y-4">
    <h2 class="text-xl font-bold uppercase tracking-tight text-indigo-400">
      Objetivos
    </h2>
    <p class="text-gray-400 text-lg leading-relaxed">
      {{ project?.details?.objective }}
    </p>
  </section>

  <section v-if="project?.details?.challenge" class="space-y-4">
    <h2 class="text-xl font-bold uppercase tracking-tight text-indigo-400">
      Desafios
    </h2>
    <p class="text-gray-400 text-lg leading-relaxed">
      {{ project?.details?.challenge }}
    </p>
  </section>

  <section v-if="project?.details?.impact" class="space-y-4">
    <h2 class="text-xl font-bold uppercase tracking-tight text-indigo-400">
      Impacto
    </h2>
    <p class="text-gray-400 text-lg leading-relaxed">
      {{ project?.details?.impact }}
    </p>
  </section>
</template>
