import ProductImageGallery from "@/app/(main)/(sections-product-detail)/ProductImageGallery";
import ProductPurchaseInfo from "@/app/(main)/(sections-product-detail)/ProductPurchaseInfo";
import ProductTabs from "@/app/(main)/(sections-product-detail)/ProductTabs";
import Link from "next/link";
import { productService } from "@/core/services/productService"; 

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // slug di URL biasanya string "1", service kita sudah handle convert atau terima string
  const product = await productService.getProductById(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Produk tidak ditemukan</h1>
          <p className="text-gray-500">Mungkin produk ini sudah dihapus atau link salah.</p>
          <Link href="/products" className="text-blue-600 hover:underline mt-6 inline-block font-medium">
            &larr; Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex flex-wrap">
            <li className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">
                Beranda
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/products" className="text-gray-500 hover:text-blue-600 transition-colors">
                Produk
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Konten Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            {/* UPDATE: product.image sudah array, jadi langsung pass saja */}
            <ProductImageGallery images={product.image} />
          </div>

          <div>
            {/* PENTING: Kirim data product ke komponen ini agar harga/tombol beli berfungsi */}
            {/* Anda mungkin perlu update komponen ProductPurchaseInfo untuk menerima prop 'product' */}
            <ProductPurchaseInfo product={product} />
          </div>
        </div>

        <div className="mt-16">
          {/* Kirim description ke Tabs */}
          <ProductTabs description={product.description} />
        </div>

      </div>
    </div>
  );
}