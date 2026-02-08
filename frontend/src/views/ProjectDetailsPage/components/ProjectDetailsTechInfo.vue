<script setup lang="ts">
import type { Project } from '@/types/project';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <aside class="space-y-8">
    <div class="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/30 space-y-6">
      <div>
        <h3 class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
          Tech Stack
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tech in project?.tech_stack"
            :key="tech"
            class="px-3 py-1 bg-neutral-800 rounded-full text-[10px] font-mono text-gray-300 border border-neutral-700"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <div class="pt-6 border-t border-neutral-800 space-y-4">
        <div class="flex justify-between text-[10px] uppercase font-bold tracking-widest">
          <span class="text-gray-600">Categoria</span>
          <span class="text-gray-300">Backend Development</span>
        </div>
        <div v-if="project.year" class="flex justify-between text-[10px] uppercase font-bold tracking-widest">
          <span class="text-gray-600">Ano</span>
          <span class="text-gray-300">{{project.year}}</span>
        </div>
      </div>
    </div>
  </aside>
</template>
