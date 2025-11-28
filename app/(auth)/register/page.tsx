'use client';

import Button from "@/components/ui/Button"; 
import Link from "next/link";
import { useState } from "react";
import { authService } from "@/core/services/authService";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, User, Phone, Eye, EyeOff, UserPlus } from "lucide-react";

// Komponen Input (Reused logic)
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
    {togglePass && (
      <button type="button" onClick={togglePass} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
        {isPassVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    )}
  </div>
);

export default function RegisterPage() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak sama.");
      setIsLoading(false);
      return;
    }

    try {
      await authService.register({ name, email, password, phone });
      router.push('/login');
    } catch (err: any) {
      setError(err.message || "Gagal mendaftar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[450px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Buat Akun Baru</h1>
        <p className="text-gray-500">Bergabung dengan Sentinel hari ini.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center">
           {error}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        
        {/* Nama & HP (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Nama Lengkap</label>
                <InputWithIcon icon={User} id="name" type="text" placeholder="Budi Santoso" value={name} onChange={(e:any) => setName(e.target.value)} />
            </div>
            <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">No. Telepon</label>
                <InputWithIcon icon={Phone} id="phone" type="tel" placeholder="08xxxxxxxx" value={phone} onChange={(e:any) => setPhone(e.target.value)} />
            </div>
        </div>

        {/* Email */}
        <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
            <InputWithIcon icon={Mail} id="email" type="email" placeholder="nama@email.com" value={email} onChange={(e:any) => setEmail(e.target.value)} />
        </div>

        {/* Password */}
        <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
            <InputWithIcon 
                icon={Lock} 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password} 
                onChange={(e:any) => setPassword(e.target.value)}
                togglePass={() => setShowPassword(!showPassword)}
                isPassVisible={showPassword}
            />
        </div>

        {/* Confirm Password */}
        <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">Konfirmasi Password</label>
            <InputWithIcon 
                icon={Lock} 
                id="confirmPassword" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={confirmPassword} 
                onChange={(e:any) => setConfirmPassword(e.target.value)}
            />
        </div>

        <Button 
          variant="primary" 
          type="submit" 
          className="w-full py-3.5 rounded-xl font-bold shadow-lg shadow-blue-700/20 text-base mt-2 hover:translate-y-[-2px] transition-transform"
          disabled={isLoading}
        >
          {isLoading ? "Memproses..." : "Daftar Akun"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-8">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-bold text-blue-700 hover:text-blue-800 hover:underline transition-all">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}