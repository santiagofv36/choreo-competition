import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());

    const token = cookies.find((cookie) => cookie.startsWith('access_token='));

    if (token) {
      config.headers.Authorization = `Bearer ${token.split('=')[1]}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const api = {
  login: (data: { username: string; password: string }) => {
    const formData = new URLSearchParams();
    formData.append('grant_type', '');
    formData.append('username', data.username);
    formData.append('password', data.password);
    formData.append('scope', '');
    formData.append('client_id', '');
    formData.append('client_secret', '');
    return axiosInstance.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  register: (data: {
    username: string;
    email: string;
    password: string;
    name: string;
  }) => axiosInstance.post('/auth/sign-up', data),
  getCurrentUser: () => axiosInstance.get('/auth'),
  logout: () => axiosInstance.delete('/auth/logout'),
  productsPagination: (page: number = 1, perPage: number = 10) => {
    return axiosInstance.get(`/products?page=${page}&perPage=${perPage}`);
  },
  productById: (id: string) => axiosInstance.get(`/products/${id}`),
  reviewsByProductId: (id: string, page: number = 1, perPage: number = 5) =>
    axiosInstance.get(
      `/products/${id}/reviews?page=${page}&perPage=${perPage}`
    ),
};

export default api;
