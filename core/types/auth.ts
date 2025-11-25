export interface User {
  id: number; // Dokumentasi bilang ID berupa angka (misal: 3)
  name: string;
  email: string;
  phone_number?: string;
  profile_picture?: string | null;
}

export interface AuthResponse {
  message: string;
  token?: string; // Token ada di sini untuk Login
  user?: User;    // User object
}