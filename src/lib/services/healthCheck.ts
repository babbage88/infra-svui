import { writable } from 'svelte/store';
import { fetchWithAuth } from './auth';

export const BaseApiUrl = import.meta.env.VITE_API_URL;
export const healthCheckAuthUrl = BaseApiUrl + '/authhealthCheck';
export const status = writable<string | null>('Loading...');

export async function fetchHealthStatus(): Promise<void> {
  try {
    const response = await fetchWithAuth(healthCheckAuthUrl, { method: 'GET' });

    if (response.ok) {
      const data = await response.json();
      status.set(data.status);
    } else {
      const text = await response.text();
      status.set(`Error fetching health status: ${text}`);
    }
  } catch (error) {
    console.error('Health check error:', error);
    status.set(error instanceof Error ? error.message : 'Failed to connect to the server.');
  }
}
