<script setup lang="ts">
import { projects } from '@/data/projects';
import router from '@/router';
import { Icon } from '@iconify/vue';
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
        <!-- <div
          v-if="project.images && project.images.length > 0"
          class="-mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 h-48 overflow-hidden rounded-t-2xl relative"
        >
          <div class="absolute inset-0 bg-linear-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img
            :src="project.images[0]"
            :alt="project.name"
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div> -->

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
              v-if="project.links?.find(l => l.type === 'github')"
              :href="project.links.find(l => l.type === 'github')?.url"
              target="_blank"
              class="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors relative z-20"
              title="Ver Código"
              @click.stop
            >
              <Icon
                icon="simple-icons:github"
                class="w-5 h-5"
              />
            </a>
            <a
              v-if="project.links?.find(l => l.type === 'live_demo')"
              :href="project.links.find(l => l.type === 'live_demo')?.url"
              target="_blank"
              class="text-gray-400 hover:text-black dark:text-gray-500 dark:hover:text-white transition-colors relative z-20"
              title="Ver Demo"
              @click.stop
            >
              <Icon
                icon="heroicons:arrow-top-right-on-square"
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

        <!-- <div
          v-if="project.is_featured"
          class="relative z-10 mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          <div class="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            <Icon
              icon="heroicons:squares-2x2"
              class="text-indigo-500 w-4 h-4"
            />
            Arquitetura C4
          </div>
          <div class="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            <Icon
              icon="heroicons:cpu-chip"
              class="text-indigo-500 w-4 h-4"
            />
            Clean Architecture
          </div>
          <div class="hidden md:flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            <Icon
              icon="heroicons:code-bracket"
              class="text-indigo-500 w-4 h-4"
            />
            Pytest (95% Cov)
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>
