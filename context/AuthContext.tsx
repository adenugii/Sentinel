'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // <--- WAJIB: Kita ganti localStorage dengan ini
// Sebaiknya import tipe User dari file yang sudah kita buat biar konsisten
import { User } from '@/core/types/auth'; 

interface AuthContextType {
  user: User | null;
  token: string | null; // Tambahkan token di state biar bisa diakses jika butuh
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Cek status login saat aplikasi pertama kali dimuat
  useEffect(() => {
    const initAuth = () => {
      // 1. Ambil dari COOKIES (Bukan LocalStorage)
      // Nama cookie harus sama persis dengan yang di Middleware ('token' dan 'user')
      const storedToken = Cookies.get('token');
      const storedUser = Cookies.get('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user cookie:", error);
          // Jika json rusak, hapus sekalian biar bersih
          Cookies.remove('token');
          Cookies.remove('user');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (newToken: string, userData: User) => {
    // 1. Update State React
    setToken(newToken);
    setUser(userData);

    // 2. Update COOKIES (Agar Middleware tahu kita login)
    // Penting: Nama 'token' harus konsisten
    Cookies.set('token', newToken, { expires: 1 }); // Expire 1 hari
    Cookies.set('user', JSON.stringify(userData), { expires: 1 });
    
    router.push('/'); 
  };

  const logout = () => {
    // 1. Hapus State React
    setToken(null);
    setUser(null);

    // 2. Hapus COOKIES (Agar Middleware tahu kita logout)
    // INI YANG AKAN MEMPERBAIKI BUG ANDA
    Cookies.remove('token');
    Cookies.remove('user');

    // 3. Redirect ke login
    router.push('/login');
    router.refresh(); // Opsional: Refresh agar middleware berjalan ulang bersih
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};