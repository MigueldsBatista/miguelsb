<template>
	<div
		:class="[
			'fixed inset-0 pointer-events-none z-60 transition-opacity duration-1000',
			active ? 'opacity-10 bg-indigo-500' : 'opacity-0'
		]"
	/>
</template>

<script setup lang="ts">
defineProps<{
	active: boolean;
}>();
</script>
