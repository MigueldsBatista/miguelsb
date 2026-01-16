export const useAPI = () => {
  const baseURL
    = import.meta.env.NUXT_PUBLIC_API_BASE ?? 'http://localhost:8000';

  type HttpMethod = 'get' | 'post';

  const request = async <T>(
    url: string,
    options: {
      method: HttpMethod;
      body?: object;
    }
  ): Promise<T> => {
    const { data, error } = await useFetch<T>(url, {
      baseURL,
      method: options.method,
      body: options.body
    });

    if (error.value) throw error.value;
    if (!data.value) throw new Error('Empty response');

    return data.value;
  };

  const get = <T>(url: string) =>
    request<T>(url, { method: 'get' });

  const post = <T>(url: string, body?: object) =>
    request<T>(url, { method: 'post', body });

  return { get, post };
};
