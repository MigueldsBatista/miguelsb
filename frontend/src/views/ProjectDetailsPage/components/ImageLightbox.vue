<script setup lang="ts">
import { useIndex } from '@/composables/ useIndex';
import { Icon } from '@iconify/vue';
import { onKeyStroke, useEventListener } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  images: string[];
  initialIndex?: number;
  projectName?: string;
}>();

const emit = defineEmits<{
  close: [];
}>();

const zoom = ref(1);
const isDragging = ref(false);
const panX = ref(0);
const panY = ref(0);
const dragStartX = ref(0);
const dragStartY = ref(0);

const { currentIndex, hasMultiple, goNext, goPrev, goToIndex } = useIndex(
  () => props.images.length,
  () => props.initialIndex ?? 0
);

const currentImage = computed(() => props.images[currentIndex.value]);

// Reset zoom and pan when image changes
watch(currentIndex, () => {
  zoom.value = 1;
  panX.value = 0;
  panY.value = 0;
});

// Zoom
const zoomIn = () => {
  zoom.value = Math.min(zoom.value + 0.5, 4);
};

const zoomOut = () => {
  zoom.value = Math.max(zoom.value - 0.5, 1);
  if (zoom.value === 1) {
    panX.value = 0;
    panY.value = 0;
  }
};

const resetZoom = () => {
  zoom.value = 1;
  panX.value = 0;
  panY.value = 0;
};

// Wheel zoom
const onWheel = (e: WheelEvent) => {
  e.preventDefault();
  if (e.deltaY < 0) {
    zoomIn();
  } else {
    zoomOut();
  }
};

// Pan when zoomed
const onMouseDown = (e: MouseEvent) => {
  if (zoom.value > 1) {
    isDragging.value = true;
    dragStartX.value = e.clientX - panX.value;
    dragStartY.value = e.clientY - panY.value;
  }
};

const onMouseMove = (e: MouseEvent) => {
  if (isDragging.value && zoom.value > 1) {
    panX.value = e.clientX - dragStartX.value;
    panY.value = e.clientY - dragStartY.value;
  }
};

const onMouseUp = () => {
  isDragging.value = false;
};

// Keyboard navigation
onKeyStroke('Escape', () => emit('close'));
onKeyStroke('ArrowRight', goNext);
onKeyStroke('ArrowLeft', goPrev);
onKeyStroke('+', zoomIn);
onKeyStroke('-', zoomOut);
onKeyStroke('0', resetZoom);

// Prevent body scroll when lightbox is open
useEventListener(document, 'mousemove', onMouseMove);
useEventListener(document, 'mouseup', onMouseUp);
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
      @click.self="emit('close')"
    >
      <!-- Close button -->
      <button
        @click="emit('close')"
        class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
        aria-label="Fechar"
      >
        <Icon icon="heroicons:x-mark" class="w-6 h-6" />
      </button>

      <!-- Image counter -->
      <div
        v-if="hasMultiple"
        class="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium"
      >
        {{ currentIndex + 1 }} / {{ images.length }}
      </div>

      <!-- Zoom controls -->
      <div class="absolute top-4 left-4 z-10 flex gap-2">
        <button
          @click="zoomOut"
          :disabled="zoom <= 1"
          class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Diminuir zoom"
        >
          <Icon icon="heroicons:minus" class="w-5 h-5" />
        </button>
        <button
          @click="resetZoom"
          class="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
        >
          {{ Math.round(zoom * 100) }}%
        </button>
        <button
          @click="zoomIn"
          :disabled="zoom >= 4"
          class="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Aumentar zoom"
        >
          <Icon icon="heroicons:plus" class="w-5 h-5" />
        </button>
      </div>

      <!-- Navigation arrows -->
      <button
        v-if="hasMultiple"
        @click="goPrev"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
        aria-label="Imagem anterior"
      >
        <Icon icon="heroicons:chevron-left" class="w-8 h-8" />
      </button>

      <button
        v-if="hasMultiple"
        @click="goNext"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
        aria-label="Próxima imagem"
      >
        <Icon icon="heroicons:chevron-right" class="w-8 h-8" />
      </button>

      <!-- Main image -->
      <div
        class="relative max-w-[90vw] max-h-[85vh] overflow-hidden"
        @wheel="onWheel"
      >
        <img
          :src="currentImage"
          :alt="`${projectName || 'Project'} - Image ${currentIndex + 1}`"
          class="max-w-full max-h-[85vh] object-contain select-none transition-transform duration-200"
          :class="{ 'cursor-grab': zoom > 1, 'cursor-grabbing': isDragging }"
          :style="{
            transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`,
          }"
          @mousedown="onMouseDown"
          draggable="false"
        />
      </div>

      <!-- Thumbnail dots -->
      <div
        v-if="hasMultiple"
        class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
      >
        <button
          v-for="(_, idx) in images"
          :key="idx"
          @click="goToIndex(idx)"
          class="w-2.5 h-2.5 rounded-full transition-all"
          :class="idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'"
          :aria-label="`Ir para imagem ${idx + 1}`"
        />
      </div>
    </div>
  </Teleport>
</template>
