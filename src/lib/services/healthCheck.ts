import { writable } from 'svelte/store';

export const BaseApiUrl = import.meta.env.VITE_API_URL;
export const healthCheckAuthUrl = BaseApiUrl + '/authhealthCheck';
export const status = writable<string | null>('Loading...');

const token = localStorage.getItem('authToken');
const refreshToken = localStorage.getItem('refreshToken');

export async function fetchHealthStatus(): Promise<void> {
  try {
    if (!token) {
      status.set(null); // Set to null for no token
      return;
    }

    const response = await fetch(healthCheckAuthUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      status.set(data.status);
    } else {
      const text = await response.text();
      status.set(`Error fetching health status: ${text}`);
    }
  } catch (error) {
    console.error('Health check error:', error);
    status.set('Failed to connect to the server.');
  }
}
