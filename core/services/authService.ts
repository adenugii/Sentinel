// core/services/authService.ts
import apiClient from '@/lib/apiClient'; 
import { AuthResponse } from '../types/auth';
import Cookies from 'js-cookie';

export const authService = {
  login: async (email: string, password: string) => {
    try {
      // UPDATE: Ubah '/auths/login' menjadi '/auth/login'
      const response = await apiClient.post<AuthResponse>('/auth/login', { email, password });
      
      if (response.data?.token) {
        Cookies.set('token', response.data.token, { expires: 1 });
        Cookies.set('user', JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login gagal');
    }
  },

  register: async (data: { name: string; email: string; password: string; phone: string }) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone_number: data.phone 
      };

      // UPDATE: Ubah '/auths/register' menjadi '/auth/register'
      const response = await apiClient.post('/auth/register', payload);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registrasi gagal');
    }
  },

  logout: () => {
    Cookies.remove('token');
    Cookies.remove('user');
    window.location.href = '/login';
  },

  getUser: () => {
    const userStr = Cookies.get('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};