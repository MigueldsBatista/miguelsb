<template>
	<section class="space-y-12 animate-in fade-in slide-in-from-right-10 duration-700">
		<div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
			<h2 class="text-4xl font-black tracking-tighter">
				PROJECTS
			</h2>
			<span class="text-indigo-500 font-mono text-xs uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded">
				Curadoria Selecionada (Django & Vue)
			</span>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div
				v-for="(project, index) in projects"
				:key="project.id"
				:class="[
					'group relative p-6 md:p-8 rounded-2xl border transition-all duration-500 transform hover:-translate-y-2 cursor-pointer',
					project.is_featured
						? 'md:col-span-2 bg-neutral-50 dark:bg-neutral-900 border-indigo-200/50 dark:border-indigo-900/50 hover:border-indigo-500'
						: 'bg-white/50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700'
				]"
				:style="{ animationDelay: `${index * 150}ms` }"
				@click="navigateTo(`/projects/${project.id}`)"
			>
				<div class="relative z-10 flex justify-between items-start mb-6">
					<div class="space-y-2">
						<div
							v-if="project.is_featured"
							class="flex items-center gap-2"
						>
							<span class="px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-widest rounded">Featured</span>
							<span class="text-indigo-400 text-[9px] font-bold uppercase tracking-widest">Case Study Detalhado</span>
						</div>

						<h3 class="text-xl md:text-2xl font-bold text-neutral-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
							{{ project.name }}
						</h3>
					</div>
					<div class="flex gap-4">
						<a
							v-if="project.links?.github"
							:href="project.links.github"
							target="_blank"
							class="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors relative z-20"
							title="Ver Código"
							@click.stop
						>
							<Icon
								name="i-simple-icons-github"
								class="w-5 h-5"
							/>
						</a>
						<a
							v-if="project.links?.live_demo"
							:href="project.links.live_demo"
							target="_blank"
							class="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors relative z-20"
							title="Ver Demo"
							@click.stop
						>
							<Icon
								name="i-heroicons-arrow-top-right-on-square"
								class="w-5 h-5"
							/>
						</a>
					</div>
				</div>

				<p class="relative z-10 text-gray-600 dark:text-gray-400 text-sm md:text-base mb-8 max-w-3xl leading-relaxed">
					{{ project.description }}
				</p>

				<div class="relative z-10 flex flex-wrap gap-2">
					<span
						v-for="tech in project.tech_stack"
						:key="tech"
						class="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-[10px] md:text-xs font-mono text-gray-600 dark:text-gray-300 border border-neutral-200 dark:border-neutral-700 group-hover:border-indigo-500/30 transition-colors"
					>
						{{ tech }}
					</span>
				</div>

				<div
					v-if="project.is_featured"
					class="relative z-10 mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 md:grid-cols-3 gap-6"
				>
					<div class="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
						<Icon
							name="i-heroicons-layers"
							class="text-indigo-500 w-4 h-4"
						/>
						Arquitetura C4
					</div>
					<div class="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
						<Icon
							name="i-heroicons-cpu-chip"
							class="text-indigo-500 w-4 h-4"
						/>
						Clean Architecture
					</div>
					<div class="hidden md:flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
						<Icon
							name="i-heroicons-code-bracket"
							class="text-indigo-500 w-4 h-4"
						/>
						Pytest (95% Cov)
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const projects = [
	{
		id: 1,
		name: 'Plataforma de E-commerce Escalável',
		description: 'Desenvolvimento de uma plataforma de e-commerce utilizando Django e Vue.js, focada em alta performance e escalabilidade para suportar picos de tráfego.',
		tech_stack: ['Django', 'Vue.js', 'PostgreSQL', 'Docker', 'AWS'],
		links: { github: 'https://github.com', live_demo: 'https://example.com' },
		is_featured: true
	},
	{
		id: 2,
		name: 'Sistema de Gerenciamento de Conteúdo (CMS)',
		description: 'Criação de um CMS personalizado com Django, permitindo fácil gerenciamento de conteúdo para sites corporativos.',
		tech_stack: ['Django', 'Tailwind CSS', 'SQLite'],
		links: { github: 'https://github.com' },
		is_featured: false
	},
	{
		id: 3,
		name: 'Aplicação de Análise de Dados em Tempo Real',
		description: 'Implementação de uma aplicação para análise de dados em tempo real utilizando Django Channels e WebSockets.',
		tech_stack: ['Django', 'Django Channels', 'Redis', 'Vue.js'],
		links: { github: 'https://github.com' },
		is_featured: false
	},
	{
		id: 4,
		name: 'Portal de Educação Online',
		description: 'Desenvolvimento de um portal de educação online com funcionalidades de vídeo-aulas, quizzes e fóruns de discussão.',
		tech_stack: ['Django', 'Vue.js', 'PostgreSQL', 'Celery'],
		links: { github: 'https://github.com', live_demo: 'https://example.com' },
		is_featured: true
	}
];
</script>
