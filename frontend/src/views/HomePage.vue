
<script setup lang="ts">
import TerminalBadge from '@/components/common/TerminalBadge.vue';
import GamificationButton from '@/components/home/GamificationButton.vue';
import MilestoneOverlay from '@/components/home/MilestoneOverlay.vue';
import { useIncrementCounter } from '@/composables/useFetchIncrementCounter';
import { useTimeoutFn } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';

// Reactive state
const isVisible = ref(false);
const milestone = ref(false);

// Computed
const { stats, increment } = useIncrementCounter();

const isMilestone = computed(() => stats.value.button_clicks > 0 && (stats.value.button_clicks) % 10 === 0);

// Lifecycle
onMounted(() => {
  isVisible.value = true;
});

// Methods

const handleInteraction = () => {
  increment();
  if (isMilestone.value) {
    milestone.value = true;
    useTimeoutFn(() => milestone.value = false, 3000);
  }
};
</script>

<style scoped>
/* Add any custom animations here if needed */
.animate-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<template>
  <div>
    <!-- Overlay de Milestone -->
    <MilestoneOverlay :active="milestone" />

    <!-- VIEW: HOME / HERO -->
    <section
      :class="[
        'flex flex-col items-center text-center space-y-12 py-10 md:py-20 animate-in fade-in slide-in-from-bottom-10 duration-1000 transition-all transform',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      ]"
    >
      <div class="space-y-4">
        <h1 class="text-5xl md:text-8xl font-black tracking-tighter leading-tight">
          SOFTWARE <span class="text-indigo-600">DEVELOPER</span>
        </h1>
        <p class="text-gray-400 text-base md:text-xl max-w-2xl mx-auto px-4">
          Especialista em ecossistema Python/Django, focado em alta performance, escalabilidade global e arquiteturas resilientes.
        </p>
      </div>

      <!-- BOTÃO DE GAMIFICAÇÃO CENTRAL -->
      <GamificationButton
        :clicks="stats.button_clicks"
        :milestone="milestone"
        @interaction="handleInteraction"
      />

      <TerminalBadge>
        python3 -m miguelsb --start
      </TerminalBadge>
    </section>
  </div>
</template>
