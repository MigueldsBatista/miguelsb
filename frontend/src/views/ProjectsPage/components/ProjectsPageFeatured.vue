<script setup lang="ts">
import type { Project } from '@/types/project';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <div
    v-if="project.is_featured"
    class="flex items-center gap-2"
  >
    <span class="px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-widest rounded">Featured</span>
    <span class="text-indigo-400 text-[9px] font-bold uppercase tracking-widest">Case Study Detalhado</span>
  </div>
</template>
