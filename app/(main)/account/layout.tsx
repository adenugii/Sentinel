import AccountSidebar from "./AccountSidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Kolom Kiri: Sidebar Navigasi Akun */}
          <div className="md:col-span-1">
            <AccountSidebar />
          </div>

          {/* Kolom Kanan: Konten Halaman */}
          <div className="md:col-span-3">
            {children}
          </div>
          
        </div>
      </div>
    </div>
  );
}