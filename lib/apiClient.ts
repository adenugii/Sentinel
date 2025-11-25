// lib/apiClient.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = "/api/proxy"; 

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// UPDATE DI SINI:
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Cek jika errornya adalah 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Pastikan kode ini hanya jalan di browser (client-side)
      if (typeof window !== 'undefined') {
        // 1. Bersihkan Data Login yang kadaluarsa
        Cookies.remove('token');
        Cookies.remove('user');
        
        // 2. Redirect paksa ke halaman login
        // Kita gunakan window.location agar halaman ter-refresh penuh
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;