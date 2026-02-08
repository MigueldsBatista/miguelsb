<script setup lang="ts">
import type { Project } from '@/types/project';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <section
    v-if="project?.is_featured"
    class="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-6"
  >
    <h3 class="font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
      <Icon
        icon="heroicons:cpu-chip"
        class="text-indigo-500 w-4 h-4"
      />
      Arquitetura e Performance
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-2">
        <h4 class="text-sm font-bold text-gray-300">
          Clean Architecture
        </h4>
        <p class="text-xs text-gray-500">
          Implementação rigorosa de padrões de design para garantir manutenibilidade e testabilidade.
        </p>
      </div>
      <div class="space-y-2">
        <h4 class="text-sm font-bold text-gray-300">
          Escalabilidade Horizontal
        </h4>
        <p class="text-xs text-gray-500">
          Preparado para deployments em clusters Kubernetes com replicação de serviços.
        </p>
      </div>
    </div>
  </section>
</template>
