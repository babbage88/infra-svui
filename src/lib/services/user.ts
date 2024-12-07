const BaseApiUrl = import.meta.env.VITE_API_URL;
const createUserUrl = BaseApiUrl + '/create/user';
const token = localStorage.getItem('authToken');
const refreshToken = localStorage.getItem('refreshToken');

