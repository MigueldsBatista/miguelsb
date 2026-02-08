import { onMounted, ref } from 'vue';

interface SiteStat {
  button_clicks: number;
  total_visitors: number;
  updated_at: string;
}

const baseURL = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000';

export const useIncrementCounter = () => {
  const stats = ref<SiteStat>({
    button_clicks: 0,
    total_visitors: 0,
    updated_at: ''
  });

  const increment = async () => {
    stats.value = {
      ...stats.value,
      button_clicks: stats.value.button_clicks + 1
    };
  };

  const fetchStats = async () => {
    return {
      button_clicks: 0,
      total_visitors: 0,
      updated_at: ''
    } as SiteStat;
  };

  onMounted(() => fetchStats());

  return { stats, increment };
};
