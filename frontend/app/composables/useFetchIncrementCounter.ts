/* eslint-disable camelcase */
interface SiteStat {
  button_clicks: number;
  total_visitors: number;
  updated_at: string;
}

const baseURL = import.meta.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000';

export const useIncrementCounter = () => {
  const stats = ref<SiteStat>({
    button_clicks: 0,
    total_visitors: 0,
    updated_at: ''
  });

  const increment = async () => {
    try {
      const data = await $fetch<SiteStat>('/api/stats/increment/', {
        method: 'POST',
        baseURL
      });
      stats.value = data;
    }
    catch (error) {
      console.error('Error incrementing counter:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await $fetch<SiteStat>('/api/stats/increment/', {
        method: 'GET',
        baseURL
      });
      stats.value = data;
    }
    catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  onMounted(() => fetchStats());

  return { stats, increment };
};
