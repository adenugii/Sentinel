import ProductImageGallery from "@/app/(sections-product-detail)/ProductImageGallery";
import ProductPurchaseInfo from "@/app/(sections-product-detail)/ProductPurchaseInfo";
import ProductTabs from "@/app/(sections-product-detail)/ProductTabs";
import { featuredProducts } from "@/data/mock/products";
import Link from "next/link";

// --- Mock Data ---
// Di aplikasi nyata, Anda akan fetch data berdasarkan `params.slug`
// Di sini kita ambil saja produk pertama dari mock data kita
const getProductBySlug = async (slug: string) => {
  const product = featuredProducts.find(p => p.id === "1"); // Simulasikan slug/id
  
  if (!product) return null;

  return {
    ...product,
    images: [
      "/images/galaxy-s24-ultra.png", // Gambar utama
      "/images/iphone-15-pro.png", // Ganti dengan gambar thumbnail
      "/images/macbook-pro-m3.png", // Ganti dengan gambar thumbnail
      "/images/apple-watch-ultra.png", // Ganti dengan gambar thumbnail
    ]
  };
};
// --- Akhir Mock Data ---


export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  
  // Ambil data (simulasi)
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return <div>Produk tidak ditemukan</div>;
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Beranda
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/smartphones" className="text-gray-500 hover:text-blue-600">
                Smartphones
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-gray-900 font-semibold" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Konten Utama: 2 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Kolom Kiri: Galeri Gambar */}
          <div>
            <ProductImageGallery images={product.images} />
          </div>

          {/* Kolom Kanan: Info Pembelian */}
          <div>
            {/* Kita tidak bisa pass 'product' ke sini karena Info
              memiliki komponen 'use client'. Kita akan perbaiki ini
              di langkah selanjutnya jika diperlukan, tapi untuk sekarang
              PurchaseInfo akan menggunakan data mock-nya sendiri.
            */}
            <ProductPurchaseInfo />
          </div>
        </div>

        {/* Bagian Bawah: Tabs */}
        <div className="mt-16">
          <ProductTabs />
        </div>

      </div>
    </div>
  );
}