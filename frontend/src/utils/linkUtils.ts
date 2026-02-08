import type { Link } from '@/types/project';

export function getLinkInfo(link: Link): Link {
  const defaults = {
    github: {
      name: 'GitHub Repository',
      icon: 'simple-icons:github',
      classes: 'flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-indigo-500 transition-colors text-sm font-bold text-white'
    },
    live_demo: {
      name: 'Live Demo',
      icon: 'heroicons:arrow-top-right-on-square',
      classes: 'flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-bold'
    },
    other: {
      icon: 'heroicons:link',
      classes: 'flex items-center gap-2 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-xl hover:border-gray-500 transition-colors text-sm font-bold text-white'
    }
  };

  const type = link.type || 'other';
  const defaultInfo = defaults[type] || defaults.other;

  return {
    ...defaultInfo,
    ...link,
    classes: link.classes || defaultInfo.classes
  };
}
