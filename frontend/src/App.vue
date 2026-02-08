<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { Toaster } from 'vue-sonner';

</script>

<template>
  <Toaster position="top-right" richColors :duration="5000" />
  <RouterView #="{ Component }">
    <DefaultLayout>
      <component :is="Component" />
    </DefaultLayout>
  </RouterView>

</template>
