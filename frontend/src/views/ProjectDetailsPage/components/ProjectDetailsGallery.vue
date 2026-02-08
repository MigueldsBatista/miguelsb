<script setup lang="ts">
import type { Project } from '@/types/project';

defineProps<{
  project: Project;
}>();
</script>

<template>
  <section v-if="project?.images?.length" class="space-y-4">
    <h3 class="text-xl font-bold uppercase tracking-tight text-indigo-400">
      Galeria
    </h3>
    <div class="relative group rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
      <div
        class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style="scrollbar-width: none; -ms-overflow-style: none;"
      >
        <div
          v-for="(img, idx) in project.images"
          :key="idx"
          class="min-w-full snap-center"
        >
          <img
            :src="img"
            :alt="`${project.name} screenshot ${idx + 1}`"
            class="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      </div>

      <!-- Carousel text hint if multiple images -->
      <div v-if="project.images.length > 1" class="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full text-xs text-white backdrop-blur-sm">
        Deslize para ver mais
      </div>
    </div>
  </section>
</template>
