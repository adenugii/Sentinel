import AccountSidebar from "./AccountSidebar";
import ProtectedRoute from "@/components/layout/ProtectedRoute"; // <-- Import ini

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Bungkus SELURUH layout akun dengan ProtectedRoute
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Sidebar */}
            <div className="md:col-span-1">
              <AccountSidebar />
            </div>

            {/* Konten Halaman */}
            <div className="md:col-span-3">
              {children}
            </div>
            
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}