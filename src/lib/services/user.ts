import { fetchWithAuth } from './auth';
const BaseApiUrl = import.meta.env.VITE_API_URL;
const createUserUrl = BaseApiUrl + '/create/user';
const usersUrl = BaseApiUrl + '/users';
const token = localStorage.getItem('authToken');
const refreshToken = localStorage.getItem('refreshToken');

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  lastModified: string;
  enabled: boolean;
  isDeleted: boolean;
}


export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetchWithAuth(usersUrl, { method: 'POST' });

    if (response.ok) {
      const data: User[] = await response.json();
      return data; // Return the typed data
    } else {
      const text = await response.text();
      console.error('Fetch error:', text);
      return [];
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}