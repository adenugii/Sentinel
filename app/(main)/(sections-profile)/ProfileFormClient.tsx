'use client';

import Input from "@/components/ui/Input"; 
import { Loader2, Mail, Phone, User, ShieldCheck, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { userService, UserProfile } from "@/core/services/userService";
import ProfilePhotoUpload from "./ProfilePhotoUpload";

export default function ProfileFormClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile(data);
        setFormData({
          name: data.name,
          phone: data.phone_number
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedData = await userService.updateProfile({
        name: formData.name,
        phone_number: formData.phone
      });
      
      setProfile(updatedData);
      alert("Profil berhasil diperbarui!");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Gagal menyimpan perubahan.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
      </div>
    );
  }

  return (
    <div className="relative pb-24"> 
      
      {/* CARD DESAIN BARU: SPLIT LAYOUT */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        
        {/* Panel Kiri: Identitas Visual (Soft Background) */}
        <div className="md:w-1/3 bg-gray-50/80 p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-gray-100">
           <div className="mt-4 mb-6 relative">
              {/* Efek Glow halus di belakang foto */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full blur-xl opacity-70"></div>
              <div className="relative">
                <ProfilePhotoUpload currentImage={profile?.profile_picture} />
              </div>
           </div>
           
           <h2 className="text-xl font-bold text-gray-900 mb-1">{profile?.name}</h2>
           <p className="text-sm text-gray-500 mb-4 font-medium">{profile?.email}</p>
           
           <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-semibold shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
              User ID: #{profile?.id}
           </div>
        </div>

        {/* Panel Kanan: Form Edit */}
        <div className="flex-1 p-8 md:p-10 bg-white">
            <div className="mb-8 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-900">Informasi Pribadi</h3>
                <p className="text-gray-500 text-sm mt-1">Kelola data diri Anda untuk keamanan akun Sentinel.</p>
            </div>

            <div className="space-y-6 max-w-lg">
                
              {/* Nama Lengkap */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  Nama Lengkap
                </label>
                <Input 
                  id="name"
                  label=""
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  placeholder="Masukkan nama lengkap"
                  className="bg-gray-50 focus:bg-white transition-colors"
                />
              </div>

              {/* Nomor HP */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  Nomor Telepon
                </label>
                <Input 
                    id="phone"
                    label=""
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Contoh: 081234567890"
                    className="bg-gray-50 focus:bg-white transition-colors"
                />
              </div>

              {/* Email (Read Only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  Email Terdaftar
                </label>
                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm font-medium flex justify-between items-center cursor-not-allowed">
                  <span>{profile?.email}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">VERIFIED</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 ml-1">
                  *Email tidak dapat diubah demi keamanan akun.
                </p>
              </div>

            </div>
        </div>
      </div>

      {/* STICKY ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-4 z-40 md:pl-72">
        <div className="max-w-7xl mx-auto px-4 flex justify-end items-center gap-4">
            <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 px-8 rounded-lg flex items-center transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-700/20 active:scale-95"
            >
                {isSaving ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Menyimpan...
                    </>
                ) : (
                    <>
                        <Save className="w-4 h-4 mr-2" />
                        Simpan Perubahan
                    </>
                )}
            </button>
        </div>
      </div>

    </div>
  );
}