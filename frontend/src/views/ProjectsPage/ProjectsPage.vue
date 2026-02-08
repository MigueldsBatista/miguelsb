<script setup lang="ts">
import { projects } from '@/data/projects';
import router from '@/router';
import ProjectsPageAbout from './components/ProjectsPageAbout.vue';
import ProjectsPageFeatured from './components/ProjectsPageFeatured.vue';
import ProjectsPageLinks from './components/ProjectsPageLinks.vue';
import ProjectsPageTechInfo from './components/ProjectsPageTechInfo.vue';

</script>

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
        @click="router.push({ name: 'project-details', params: { id: project.id } })"
      >

        <div class="relative z-10 flex justify-between items-start mb-6">
          <div class="space-y-2">
            <ProjectsPageFeatured :project/>

            <h3 class="text-xl md:text-2xl font-bold text-neutral-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {{ project.name }}
            </h3>
          </div>
          <ProjectsPageLinks :project/>
        </div>

        <ProjectsPageAbout :project/>

        <ProjectsPageTechInfo :project/>

      </div>
    </div>
  </section>
</template>
