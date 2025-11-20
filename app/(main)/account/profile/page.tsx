// Update path import agar sesuai dengan struktur baru
import ProfileFormClient from "@/app/(main)/(sections-profile)/ProfileFormClient";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil Saya</h1>
        <p className="text-gray-600">
          Kelola informasi profil Anda untuk mengontrol, melindungi, dan mengamankan akun.
        </p>
      </div>

      {/* Form Profil Utama */}
      <ProfileFormClient />
    </div>
  );
}