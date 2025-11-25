// core/services/userService.ts
import apiClient from '@/lib/apiClient';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  profile_picture: string | null;
}

interface UpdateProfilePayload {
  name: string;
  phone_number: string;
}

export const userService = {
  // GET Profile
  getProfile: async (): Promise<UserProfile> => {
    try {
      const response = await apiClient.get<{ data: UserProfile }>('/users/profile');
      return response.data.data;
    } catch (error: any) {
      // DEBUGGING: Log error lengkap ke console browser
      console.error("🔥 GET PROFILE ERROR:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });

      // Cek status code spesifik
      if (error.response?.status === 401) {
        throw new Error("Sesi habis. Silakan login kembali.");
      }
      
      throw new Error(error.response?.data?.message || `Gagal mengambil profil (Status: ${error.response?.status})`);
    }
  },

  // PUT Profile
  updateProfile: async (payload: UpdateProfilePayload): Promise<UserProfile> => {
    try {
      const response = await apiClient.put<{ message: string; data: UserProfile }>('/users/profile', payload);
      return response.data.data;
    } catch (error: any) {
      console.error("🔥 UPDATE PROFILE ERROR:", error.response);
      throw new Error(error.response?.data?.message || 'Gagal mengupdate profil');
    }
  }
};