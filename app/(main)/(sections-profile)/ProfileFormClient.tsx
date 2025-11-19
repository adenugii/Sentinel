'use client';

import Input from "@/components/ui/Input"; 
import Button from "@/components/ui/Button";
import ProfilePhotoUpload from "./ProfilePhotoUpload";
import AddressCard from "./AddressCard";
import { Plus, Save } from "lucide-react";
import { useState } from "react";

export default function ProfileFormClient() {
  // State form biodata
  const [name, setName] = useState("Ahmad Ridwan");
  const [birthDate, setBirthDate] = useState("1990-01-01"); // Format YYYY-MM-DD untuk input date

  return (
    <div className="space-y-8 relative pb-24"> 
      
      {/* SECTION 1: BIODATA */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Kolom Kiri: Foto */}
          <div className="lg:col-span-1">
             <ProfilePhotoUpload />
          </div>

          {/* Kolom Kanan: Form */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b pb-4">Biodata Diri</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                <Input 
                  label="" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                <div className="flex items-center space-x-4">
                    <input 
                        type="date" 
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                    <button className="text-sm font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap">
                        Ubah Tanggal Lahir
                    </button>
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
          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center space-x-3">
                <span className="text-gray-900 text-lg">ahmad.ridwan@gmail.com</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>
            </div>
            <button className="text-blue-700 font-semibold hover:text-blue-800">Ubah</button>
          </div>

          {/* Divider Halus */}
          <hr className="border-gray-100" />

          {/* Nomor HP */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
              <div className="flex items-center space-x-3">
                <span className="text-gray-900 text-lg">0812-3456-7890</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">
                  Verified
                </span>
              </div>
            </div>
            <button className="text-blue-700 font-semibold hover:text-blue-800">Ubah</button>
          </div>
        </div>
      </div>

      {/* SECTION 3: ALAMAT */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-lg font-bold text-gray-900">Alamat Saya</h3>
            <button className="flex items-center text-blue-700 font-bold border border-blue-700 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Alamat Baru
            </button>
        </div>

        <div className="space-y-4">
            <AddressCard 
                isPrimary={true}
                label="Rumah"
                receiverName="Ahmad Ridwan"
                phone="081234567890"
                address="Jl. Sudirman No. 123, RT 05 RW 03, Kebayoran Baru, Jakarta Selatan, DKI Jakarta, 12190"
            />
        </div>
      </div>

      {/* STICKY ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white border-t border-gray-800 p-4 z-40 md:pl-72">
        <div className="max-w-7xl mx-auto px-4 flex justify-end">
            <button className="bg-transparent hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-md flex items-center transition-colors border border-gray-600">
                <Save className="w-4 h-4 mr-2" />
                Simpan Perubahan
            </button>
        </div>
      </div>

    </div>
  );
}