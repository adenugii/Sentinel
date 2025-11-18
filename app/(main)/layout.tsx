import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Layout ini akan membungkus semua halaman di dalam (main)
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}