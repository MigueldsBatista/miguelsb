<script setup lang="ts">
import type { Project } from '@/types/project';
import { Icon } from '@iconify/vue';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="flex gap-4">
    <a
      v-if="project.links?.find(l => l.type === 'github')"
      :href="project.links.find(l => l.type === 'github')?.url"
      target="_blank"
      class="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors relative z-20"
      title="Ver Código"
      @click.stop
    >
      <Icon
        icon="simple-icons:github"
        class="w-5 h-5"
      />
    </a>
    <a
      v-if="project.links?.find(l => l.type === 'live_demo')"
      :href="project.links.find(l => l.type === 'live_demo')?.url"
      target="_blank"
      class="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors relative z-20"
      title="Ver Demo"
      @click.stop
    >
      <Icon
        icon="heroicons:arrow-top-right-on-square"
        class="w-5 h-5"
      />
    </a>
  </div>
</template>
