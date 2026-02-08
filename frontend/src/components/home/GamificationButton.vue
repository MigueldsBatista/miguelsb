<template>
	<div class="relative group scale-90 md:scale-100">
		<button
			:class="[
				'relative z-10 w-48 h-48 rounded-full bg-indigo-600 flex flex-col items-center justify-center shadow-2xl transition-all duration-200 transform',
				isAnimating ? 'scale-110' : 'hover:scale-105',
				milestone ? 'shadow-indigo-500 animate-pulse' : 'shadow-indigo-500/20'
			]"
			@click="handleClick"
		>
			<!-- Sparkles Icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				:class="[
					'w-8 h-8 mb-2 transition-transform duration-500',
					milestone ? 'rotate-180 scale-125 text-yellow-300' : 'group-hover:rotate-12'
				]"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
				/>
			</svg>

			<span class="text-4xl font-black tracking-tighter text-white">{{ clicks }}</span>
			<span class="text-[10px] font-bold uppercase tracking-widest text-indigo-200">
				Interações Totais
			</span>
		</button>

		<!-- Glow Effect -->
		<div
			:class="[
				'absolute inset-0 bg-indigo-600 rounded-full blur-3xl transition-opacity duration-500',
				milestone ? 'opacity-40' : 'opacity-10 group-hover:opacity-20'
			]"
		/>

		<div
			v-if="milestone"
			class="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-indigo-500 text-white px-4 py-2 rounded-full text-xs font-bold animate-bounce shadow-lg"
		>
			MARCO ATINGIDO! 🎉 +10 cliques
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core';
import { ref } from 'vue';

defineProps<{
  clicks: number;
  milestone: boolean;
}>();

const emit = defineEmits<{
  (e: 'interaction'): void;
}>();

const isAnimating = ref(false);

const handleClick = () => {
  isAnimating.value = true;
  useTimeoutFn(() => isAnimating.value = false, 200);
  emit('interaction');
};
</script>
