import ProductImageGallery from "@/app/(main)/(sections-product-detail)/ProductImageGallery";
import ProductPurchaseInfo from "@/app/(main)/(sections-product-detail)/ProductPurchaseInfo";
import ProductTabs from "@/app/(main)/(sections-product-detail)/ProductTabs";
import Link from "next/link";
import { productService } from "@/services/productService"; // <-- Import Service

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Await params (Best Practice Next.js 15+)
  const { slug } = await params;

  // 2. PANGGIL SERVICE (Gantikan fungsi lokal)
  const product = await productService.getProductById(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Produk tidak ditemukan</h1>
          <Link href="/products" className="text-blue-600 hover:underline mt-4 block">
            Kembali ke Produk
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
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Beranda
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <Link href="/products" className="text-gray-500 hover:text-blue-600">
                Produk
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-gray-900 font-semibold" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Konten Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            {/* Gunakan images dari service, atau fallback ke array berisi imageUrl utama */}
            <ProductImageGallery images={product.images || [product.imageUrl]} />
          </div>

          <div>
            <ProductPurchaseInfo />
          </div>
        </div>

        <div className="mt-16">
          <ProductTabs />
        </div>

      </div>
    </div>
  );
}