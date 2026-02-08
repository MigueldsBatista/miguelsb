<script setup lang="ts">
import DefaultFooter from './DefaultFooter.vue';
import DefaultNavbar from './DefaultNavbar.vue';

</script>

<template>
  <div class="min-h-screen transition-colors duration-700 font-sans overflow-x-hidden bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-white">
    <DefaultNavbar  />
    <main class="pt-32 px-6 max-w-6xl mx-auto pb-20">
      <slot />
    </main>
    <DefaultFooter />
  </div>
</template>
