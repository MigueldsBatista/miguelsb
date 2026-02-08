<template>
	<div class="flex gap-4 pt-10">
		<div class="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-3 group hover:border-indigo-500 transition-colors">
			<!-- Terminal Icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 text-indigo-500 group-hover:animate-pulse"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
				/>
			</svg>
			<span class="text-xs md:text-sm font-mono text-gray-400">
				<slot />
			</span>
		</div>
	</div>
</template>
