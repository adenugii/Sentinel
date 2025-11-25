// app/(main)/(sections-profile)/ProfileFormClient.tsx
'use client';

import Input from "@/components/ui/Input"; 
import Button from "@/components/ui/Button";
import ProfilePhotoUpload from "./ProfilePhotoUpload";
import AddressCard from "./AddressCard";
import { Plus, Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { userService, UserProfile } from "@/core/services/userService";

export default function ProfileFormClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // State Data User
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // State Form (Editable)
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Load Data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile(data);
        setName(data.name);
        setPhone(data.phone_number);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  // Handle Simpan
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updatedData = await userService.updateProfile({
        name: name,
        phone_number: phone
      });
      
      // Update UI dengan data terbaru dari server
      setProfile(updatedData);
      alert("Profil berhasil diperbarui!");
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-blue-700"/></div>;
  }

  return (
    <div className="space-y-8 relative pb-24"> 
      
      {/* SECTION 1: BIODATA */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Kolom Kiri: Foto */}
          <div className="lg:col-span-1">
             {/* Kirim URL foto dari API ke komponen upload */}
             <ProfilePhotoUpload currentImage={profile?.profile_picture} />
          </div>

          {/* Kolom Kanan: Form */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Biodata Diri</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <Input 
                  id="name"
                  label="" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              {/* API Belum menyediakan Tanggal Lahir, jadi kita disable dulu atau biarkan statis */}
              <div className="opacity-50 pointer-events-none grayscale"> 
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir (Belum tersedia)</label>
                <div className="flex items-center space-x-4">
                    <input 
                        type="date" 
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: KONTAK INFO */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 border-b pb-4 mb-6">Kontak Info</h3>
        
        <div className="space-y-6">
          {/* Email (Read Only) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center space-x-3">
                <span className="text-gray-900 text-lg">{profile?.email}</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>
            </div>
            {/* Tombol ubah email dihilangkan karena biasanya butuh flow khusus (OTP) */}
          </div>

          <hr className="border-gray-100" />

          {/* Nomor HP (Editable) */}
          <div className="flex flex-col gap-2">
             <label className="block text-sm font-medium text-gray-700">Nomor HP</label>
             <Input 
                id="phone"
                label=""
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
             />
          </div>
        </div>
      </div>

      {/* SECTION 3: ALAMAT */}
      {/* Karena API get profile belum mengembalikan alamat, kita tampilkan placeholder static 
          atau kita bisa sembunyikan section ini jika mau. Di sini saya biarkan static dulu. */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 opacity-60">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-lg font-bold text-gray-900">Alamat Saya (Coming Soon)</h3>
        </div>
        <div className="space-y-4">
            <AddressCard 
                isPrimary={true}
                label="Rumah"
                receiverName={name}
                phone={phone}
                address="Alamat belum disetting di database."
            />
        </div>
      </div>

      {/* STICKY ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 md:pl-72 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 flex justify-end items-center gap-4">
            <p className="text-sm text-gray-500 hidden sm:block">
                Pastikan data yang Anda masukkan sudah benar.
            </p>
            <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-md flex items-center transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-700/20"
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