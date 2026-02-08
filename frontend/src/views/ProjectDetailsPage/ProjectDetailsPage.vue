
<script setup lang="ts">
import useNotify from '@/composables/useNotify';
import { projects } from '@/data/projects';
import router from '@/router';
import type { Project } from '@/types/project';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import ProjectDetailsAbout from './components/ProjectDetailsAbout.vue';
import ProjectDetailsFeatured from './components/ProjectDetailsFeatured.vue';
import ProjectDetailsGallery from './components/ProjectDetailsGallery.vue';
import ProjectDetailsLinks from './components/ProjectDetailsLinks.vue';
import ProjectDetailsTechInfo from './components/ProjectDetailsTechInfo.vue';

const route = useRoute();

const project = ref<Project>({});

const fetchProject = async () => {
  const foundProject = projects.find(p => p.id === Number(route.params.id));
  if (foundProject) {
    project.value = foundProject;
  } else {
    router.push({ name: 'projects' });
    useNotify().error('Projeto não encontrado');
  }
};

onMounted(fetchProject);
</script>

<template>
  <div class="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
    <!-- Botão Voltar -->
    <RouterLink
      to="/projects"
      class="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-500 transition-colors group"
    >
      <Icon
        icon="heroicons:arrow-left"
        class="w-4 h-4 group-hover:-translate-x-1 transition-transform"
      />
      <span class="text-xs font-bold uppercase tracking-widest">Voltar para Projetos</span>
    </RouterLink>

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

      <ProjectDetailsLinks :project="project" />
    </header>

    <!-- Conteúdo Principal -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Coluna Esquerda: Descrição e Detalhes -->
      <div class="lg:col-span-2 space-y-8">
        <ProjectDetailsAbout :project="project" />

        <ProjectDetailsFeatured :project="project" v-if="false"/>

        <!-- Project Gallery Carousel -->
        <ProjectDetailsGallery :project="project" />
      </div>

      <!-- Coluna Direita: Tech Stack e Info -->
      <ProjectDetailsTechInfo :project="project" />
    </div>
  </div>
</template>
