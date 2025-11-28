'use client';

import Button from "@/components/ui/Button"; 
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/core/services/authService";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

// Komponen Input dengan Ikon (Inline Component)
const InputWithIcon = ({ icon: Icon, id, type, placeholder, value, onChange, togglePass, isPassVisible }: any) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      id={id}
      type={type}
      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block transition-all"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
    {/* Tombol Toggle Password */}
    {togglePass && (
      <button
        type="button"
        onClick={togglePass}
        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
      >
        {isPassVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    )}
  </div>
);

export default function LoginPage() {
  const { login } = useAuth(); 
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await authService.login(email, password);
      if (!response.token || !response.user) throw new Error("Login gagal.");
      login(response.token, response.user);
      router.push('/'); 
    } catch (err: any) {
      setError(err.message || "Email atau password salah.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Selamat Datang</h1>
        <p className="text-gray-500">Masuk untuk mengelola garansi Anda.</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center animate-in fade-in">
          <svg className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        
        {/* Email Input */}
        <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
            <InputWithIcon 
                icon={Mail} 
                id="email" 
                type="email" 
                placeholder="nama@email.com" 
                value={email} 
                onChange={(e: any) => setEmail(e.target.value)} 
            />
        </div>

        {/* Password Input */}
        <div>
            <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
                <Link href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700">Lupa Password?</Link>
            </div>
            <InputWithIcon 
                icon={Lock} 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password} 
                onChange={(e: any) => setPassword(e.target.value)}
                togglePass={() => setShowPassword(!showPassword)}
                isPassVisible={showPassword}
            />
        </div>

        <Button 
          variant="primary" 
          type="submit" 
          className="w-full py-3.5 rounded-xl font-bold shadow-lg shadow-blue-700/20 text-base flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-transform"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LogIn className="w-5 h-5" /> Masuk</>}
        </Button>
      </form>

      {/* Footer / Register Link */}
      <p className="text-center text-sm text-gray-600 mt-8">
        Belum punya akun?{" "}
        <Link href="/register" className="font-bold text-blue-700 hover:text-blue-800 hover:underline transition-all">
          Daftar Sekarang
        </Link>
      </p>
    </div>
  );
}