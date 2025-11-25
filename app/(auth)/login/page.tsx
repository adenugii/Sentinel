'use client';

import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button"; 
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/core/services/authService"; // Import Service
import { useRouter } from "next/navigation"; // Import Router

// ... (Komponen GoogleIcon tetap sama, tidak perlu diubah) ...
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function LoginPage() {
  const { login } = useAuth(); 
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // Tambahkan state Error

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authService.login(email, password);
      
      // Validasi respons
      if (!response.token || !response.user) {
        throw new Error("Login gagal: Token atau data user tidak ditemukan.");
      }

      // HAPUS BAGIAN KONVERSI INI:
      /* const userForContext = {
        ...response.user,
        id: String(response.user.id) 
      };
      */

      // GANTI DENGAN:
      // Masukkan response.user langsung (karena id-nya sudah number, cocok dengan tipe User)
      login(response.token, response.user);

      router.push('/'); 

    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Sign In To Your Account
      </h1>
      <p className="text-gray-600 mb-8">
        Welcome back! Please enter your details.
      </p>

      {/* Tampilkan Error jika ada */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className="flex justify-between items-center text-sm">
          <Checkbox
            id="remember-me"
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Link href="#" className="font-medium text-blue-700 hover:text-blue-800">
            Forgot password?
          </Link>
        </div>

        <Button 
          variant="primary" 
          type="submit" 
          className="w-full text-lg py-3"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* ... Bagian bawah (Link register & Google) tetap sama ... */}
       <p className="text-center text-sm text-gray-600 mt-6">
        Don't have an account?{" "}
        <Link href="/register" className="font-medium text-blue-700 hover:text-blue-800">
          Sign up here
        </Link>
      </p>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500">Or continue with</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <Button variant="secondary" className="w-full text-lg py-3 flex items-center justify-center space-x-2">
        <GoogleIcon />
        <span>Sign In With Google</span>
      </Button>
    </div>
  );
}