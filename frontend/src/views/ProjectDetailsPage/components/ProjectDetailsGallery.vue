<script setup lang="ts">
import { useIndex } from '@/composables/ useIndex';
import type { Project } from '@/types/project';
import ImageLightbox from '@/views/ProjectDetailsPage/components/ImageLightbox.vue';
import { Icon } from '@iconify/vue';
import { useIntervalFn } from '@vueuse/core';
import { computed, ref } from 'vue';

const props = defineProps<{
  project: Project;
}>();

const isHovering = ref(false);
const isLightboxOpen = ref(false);
const lightboxInitialIndex = ref(0);

const images = computed(() => props.project?.images ?? []);

const SLIDE_INTERVAL = 4000;

const {
  currentIndex,
  goNext,
  goPrev,
  goToIndex,
  hasMultiple
} = useIndex(() => images.value.length);

useIntervalFn(() => {
  if (!isHovering.value && hasMultiple.value) {
    goNext();
  }
}, SLIDE_INTERVAL);

const openLightbox = (idx: number) => {
  lightboxInitialIndex.value = idx;
  isLightboxOpen.value = true;
};

const closeLightbox = () => {
  isLightboxOpen.value = false;
};
</script>

<template>
  <section v-if="images.length" class="space-y-4">
    <h3 class="text-xl font-bold uppercase tracking-tight text-indigo-400">
      Galeria
    </h3>

    <div
      class="relative group rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <!-- Main carousel container with responsive aspect ratio -->
      <div class="relative overflow-hidden aspect-video md:aspect-auto md:max-h-[500px]">
        <div
          class="flex w-full h-full transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(img, idx) in images"
            :key="idx"
            class="w-full shrink-0 h-full cursor-pointer"
            @click="openLightbox(idx)"
          >
            <img
              :src="img"
              :alt="`${project.name} screenshot ${idx + 1}`"
              class="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>

      <!-- Navigation arrows (visible on hover) -->
      <template v-if="hasMultiple">
        <button
          @click.stop="goPrev"
          class="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 hover:scale-110"
          aria-label="Imagem anterior"
        >
          <Icon icon="heroicons:chevron-left" class="w-5 h-5" />
        </button>

        <button
          @click.stop="goNext"
          class="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80 hover:scale-110"
          aria-label="Próxima imagem"
        >
          <Icon icon="heroicons:chevron-right" class="w-5 h-5" />
        </button>
      </template>

      <!-- Dot indicators -->
      <div
        v-if="hasMultiple"
        class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm"
      >
        <button
          v-for="(_, idx) in images"
          :key="idx"
          @click.stop="goToIndex(idx)"
          class="w-2 h-2 rounded-full transition-all"
          :class="idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'"
          :aria-label="`Ir para imagem ${idx + 1}`"
        />
      </div>

      <!-- Click hint -->
      <div
        class="absolute top-4 right-4 bg-black/60 px-3 py-1.5 rounded-full text-xs text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5"
      >
        <Icon icon="heroicons:magnifying-glass-plus" class="w-4 h-4" />
        Clique para ampliar
      </div>
    </div>

    <!-- Lightbox -->
    <ImageLightbox
      v-if="isLightboxOpen"
      :images="images"
      :initial-index="lightboxInitialIndex"
      :project-name="project.name"
      @close="closeLightbox"
    />
  </section>
</template>
