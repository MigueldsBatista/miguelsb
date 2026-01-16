<template>
	<div class="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
		<!-- Botão Voltar -->
		<NuxtLink
			to="/projects"
			class="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-500 transition-colors group"
		>
			<Icon
				name="i-heroicons-arrow-left"
				class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
			/>
			<span class="text-xs font-bold uppercase tracking-widest">Voltar para Projetos</span>
		</NuxtLink>

		<!-- Hero do Projeto -->
		<header class="space-y-6">
			<div class="flex flex-wrap items-center gap-3">
				<span
					v-if="project?.is_featured"
					class="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded"
				>
					Featured Case Study
				</span>
				<span class="text-indigo-500 font-mono text-[10px] uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded">
					ID: #{{ $route.params.id }}
				</span>
			</div>

			<h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
				{{ project?.name || 'Carregando...' }}
			</h1>

			<div class="flex flex-wrap gap-4">
				<a
					v-if="project?.links?.github"
					:href="project.links.github"
					target="_blank"
					class="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-indigo-500 transition-colors text-sm font-bold"
				>
					<Icon
						name="i-simple-icons-github"
						class="w-5 h-5"
					/>
					Ver Repositório
				</a>
				<a
					v-if="project?.links?.live_demo"
					:href="project.links.live_demo"
					target="_blank"
					class="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-bold"
				>
					<Icon
						name="i-heroicons-arrow-top-right-on-square"
						class="w-5 h-5"
					/>
					Live Demo
				</a>
			</div>
		</header>

		<!-- Conteúdo Principal -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
			<!-- Coluna Esquerda: Descrição e Detalhes -->
			<div class="lg:col-span-2 space-y-8">
				<section class="space-y-4">
					<h2 class="text-xl font-bold uppercase tracking-tight text-indigo-400">
						Sobre o Projeto
					</h2>
					<p class="text-gray-400 text-lg leading-relaxed">
						{{ project?.description }}
					</p>
				</section>

				<section
					v-if="project?.is_featured"
					class="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-6"
				>
					<h3 class="font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
						<Icon
							name="i-heroicons-cpu-chip"
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
			</div>

			<!-- Coluna Direita: Tech Stack e Info -->
			<aside class="space-y-8">
				<div class="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/30 space-y-6">
					<div>
						<h3 class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
							Tech Stack
						</h3>
						<div class="flex flex-wrap gap-2">
							<span
								v-for="tech in project?.tech_stack"
								:key="tech"
								class="px-3 py-1 bg-neutral-800 rounded-full text-[10px] font-mono text-gray-300 border border-neutral-700"
							>
								{{ tech }}
							</span>
						</div>
					</div>

					<div class="pt-6 border-t border-neutral-800 space-y-4">
						<div class="flex justify-between text-[10px] uppercase font-bold tracking-widest">
							<span class="text-gray-600">Categoria</span>
							<span class="text-gray-300">Backend Development</span>
						</div>
						<div class="flex justify-between text-[10px] uppercase font-bold tracking-widest">
							<span class="text-gray-600">Ano</span>
							<span class="text-gray-300">2025</span>
						</div>
					</div>
				</div>
			</aside>
		</div>
	</div>
</template>

<script setup lang="ts">
const route = useRoute();

const project = ref<{
	id?: number;
	name?: string;
	description?: string;
	tech_stack?: string[];
	links?: { github?: string; live_demo?: string };
	is_featured?: boolean;
}>({});

const fetchProject = async () => {
	try {
		// No futuro: project.value = await get(`/api/projects/${route.params.id}/`);
		// Mock temporário para visual:
		const mockProjects = [
			{
				id: 1,
				name: 'Plataforma de E-commerce Escalável',
				description: 'Desenvolvimento de uma plataforma de e-commerce utilizando Django e Vue.js, focada em alta performance e escalabilidade para suportar picos de tráfego. Implementamos caching agressivo com Redis e otimização de queries no PostgreSQL.',
				tech_stack: ['Django', 'Vue.js', 'PostgreSQL', 'Docker', 'AWS', 'Redis'],
				links: { github: 'https://github.com', live_demo: 'https://example.com' },
				is_featured: true
			}
		];
		const foundProject = mockProjects.find(p => p.id === Number(route.params.id));
		if (foundProject) {
			project.value = foundProject;
		}
	}
	catch (e) {
		console.error('Erro ao carregar projeto:', e);
	}
};

onMounted(() => {
	fetchProject();
});
</script>
