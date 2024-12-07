const BaseApiUrl = import.meta.env.VITE_API_URL;
const loginApiUrl = BaseApiUrl + '/login';
const token = localStorage.getItem('authToken');
const refreshToken = localStorage.getItem('refreshToken');

export const login = async (username: string, password: string): Promise<string | void> => {
    const apiLoginUrl = import.meta.env.VITE_API_URL + '/login';
    try {
      const response = await fetch(loginApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the token in localStorage or a cookie
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('refreshToken', data.refreshToken);
        return ''; // No error message
      } else {
        const text = await response.text();
        return `Login failed: ${text}`;
      }
    } catch (err) {
      console.error('Error logging in:', err);
      return 'An unexpected error occurred.';
    }
};
