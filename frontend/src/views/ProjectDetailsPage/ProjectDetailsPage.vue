
<script setup lang="ts">
import useNotify from '@/composables/useNotify';
import { projects } from '@/data/projects';
import router from '@/router';
import type { Project } from '@/types/project';
import { getLinkInfo } from '@/utils/linkUtils';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import ProjectTechInfo from './components/ProjectTechInfo.vue';

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

        <!-- <section
          v-if="project?.is_featured"
          class="p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-6"
        >
          <h3 class="font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
            <Icon
              icon="heroicons:cpu-chip"
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
        </section> -->

        <!-- Project Gallery Carousel -->
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
      </div>

      <!-- Coluna Direita: Tech Stack e Info -->
      <ProjectTechInfo :project="project" />
    </div>
  </div>
</template>
