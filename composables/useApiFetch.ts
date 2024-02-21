import type { UseFetchOptions } from '#app';

export function useApiFetch<T>(path: string | (() => string), options: UseFetchOptions<T> = {}) {
  const baseUrl = process.env.API_URL || 'http://127.0.0.1:8000/api';
  const token = localStorage.getItem('token');

  return useFetch(baseUrl + path, {
    watch: false,
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
  });
}
