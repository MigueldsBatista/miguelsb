<script setup lang="ts">
import type { Project } from '@/types/project';
import { getLinkInfo } from '@/utils/linkUtils';
import { Icon } from '@iconify/vue';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <a
      v-for="link in project?.links"
      :key="link.url"
      :href="link.url"
      target="_blank"
      :class="getLinkInfo(link).classes"
    >
      <Icon
        v-if="getLinkInfo(link).icon"
        :icon="getLinkInfo(link).icon!"
        class="w-5 h-5"
      />
      {{ getLinkInfo(link).name }}
    </a>
  </div>
</template>
