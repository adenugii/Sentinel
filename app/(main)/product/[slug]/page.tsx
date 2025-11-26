import ProductImageGallery from "@/app/(main)/(sections-product-detail)/ProductImageGallery";
import ProductPurchaseInfo from "@/app/(main)/(sections-product-detail)/ProductPurchaseInfo";
import ProductTabs from "@/app/(main)/(sections-product-detail)/ProductTabs";
import ProductCard from "@/components/domain/ProductCard"; // <-- Import Card Produk
import Link from "next/link";
import { productService } from "@/core/services/productService"; 
import { AlertCircle, ChevronRight, Home } from "lucide-react";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch Data Produk Utama
  const product = await productService.getProductById(slug);

  // 2. Fetch Data untuk "Produk Serupa"
  const allProducts = await productService.getAllProducts();
  
  // Filter: Ambil produk lain selain yang sedang dibuka, batasi 4 item
  const relatedProducts = allProducts
    .filter((p) => String(p.id) !== String(product?.id))
    .slice(0, 4);

  // 3. Handling Not Found
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white px-4">
        <div className="bg-red-50 p-4 rounded-full mb-4">
            <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">Produk Tidak Ditemukan</h1>
        <Link 
          href="/products" 
          className="text-blue-700 font-medium hover:underline mt-2"
        >
          &larr; Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* BREADCRUMBS */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-700 flex items-center transition-colors">
              <Home className="w-4 h-4 mr-1" />
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <Link href="/products" className="hover:text-blue-700 transition-colors">
              Produk
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* KONTEN UTAMA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Grid Layout Atas: Gallery & Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x lg:divide-gray-200">
            
            {/* KOLOM KIRI: Gallery */}
            <div className="p-6 lg:p-10 bg-white">
              <ProductImageGallery images={product.image} />
            </div>

            {/* KOLOM KANAN: Info Pembelian */}
            <div className="p-6 lg:p-10 bg-white flex flex-col h-full">
              <ProductPurchaseInfo product={product} />
            </div>

          </div>
        </div>

        {/* SECTION TENGAH: Deskripsi & Spesifikasi */}
        <div className="mb-16">
           <ProductTabs description={product.description || ""} />
        </div>

        {/* SECTION BAWAH: Produk Serupa */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-10">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Produk Serupa</h2>
                    <p className="text-gray-500 text-sm mt-1">Pilihan lain yang mungkin Anda suka</p>
                </div>
                <Link href="/products" className="text-blue-700 font-semibold hover:underline text-sm hidden sm:block">
                    Lihat Semua
                </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((related) => (
                    <ProductCard key={related.id} product={related} />
                ))}
            </div>

            <div className="mt-6 sm:hidden text-center">
               <Link href="/products" className="text-blue-700 font-semibold text-sm">
                 Lihat Semua Produk &rarr;
               </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}