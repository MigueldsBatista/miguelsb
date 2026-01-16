<script setup lang="ts">
// 1. Substitui o TODO pelo controle real de Dark Mode do Nuxt UI
const colorMode = useColorMode();

const baseButton = 'text-[10px] md:text-sm font-medium uppercase tracking-widest transition-all duration-300 relative py-1';
const route = useRoute();

// 2. Definimos um objeto para nomes de exibição amigáveis
const navLinks = [
	{ label: 'Home', name: 'index' },
	{ label: 'Projetos', name: 'projects' }
];
</script>

<template>
	<div class="min-h-screen transition-colors duration-700 font-sans overflow-x-hidden bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-white">
		<nav class="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md bg-opacity-80 bg-white dark:bg-neutral-950/80">
			<div class="text-xl font-bold tracking-tighter flex items-center gap-2">
				<div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
					M
				</div>
				<span class="text-neutral-900 dark:text-white">MIGUEL.DEV</span>
			</div>

			<div class="flex gap-4 md:gap-8">
				<NuxtLink
					v-for="link in navLinks"
					:key="link.name"
					:to="{ name: link.name }"
					:class="[
						baseButton,
						route.name === link.name
							? 'text-indigo-500'
							: 'text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white'
					]"
				>
					{{ link.label }}

					<span
						v-if="route.name === link.name"
						class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 animate-in fade-in zoom-in duration-300"
					/>
				</NuxtLink>

				<UButton
					:icon="colorMode.value === 'dark' ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
					color="info"
					variant="ghost"
					aria-label="Theme"
					@click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
				/>
			</div>
		</nav>

		<main class="pt-32 px-6 max-w-6xl mx-auto pb-20">
			<slot />
		</main>

		<footer class="fixed bottom-0 left-0 w-full p-4 border-t border-neutral-200 dark:border-neutral-900 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl z-50 flex justify-between items-center text-[9px] md:text-[10px] font-mono text-gray-600 uppercase tracking-widest px-6 md:px-10">
			<div class="flex items-center gap-6">
				<span class="flex items-center gap-1.5"><div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> API Online</span>
				<span class="flex items-center gap-1.5">
					<Icon
						name="i-heroicons-device-phone-mobile-20-solid"
						class="w-3 h-3"
					/> Mobile Optimized</span>
			</div>
			<div class="flex items-center gap-2">
				<span class="hidden md:inline italic text-neutral-700 lowercase">Last update: 2026.01.16</span>
				<span class="text-indigo-500 font-bold">V1.0</span>
			</div>
		</footer>
	</div>
</template>
