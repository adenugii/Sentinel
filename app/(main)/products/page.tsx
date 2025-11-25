import ProductCard from "@/components/domain/ProductCard";
import FilterSidebar from "@/app/(main)/(sections-product-list)/FilterSidebar";
import { ChevronDown, AlertCircle } from "lucide-react"; // Tambah icon alert
import Link from "next/link";
import { productService } from "@/core/services/productService";

// Halaman ini adalah Server Component (Async)
export default async function ProductsPage() {
  // Fetch data langsung di server (Cepat & SEO Friendly)
  const allProducts = await productService.getAllProducts();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <nav className="text-sm mb-2" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
              <li className="flex items-center">
                <Link href="/" className="text-gray-500 hover:text-blue-600">
                  Beranda
                </Link>
                <span className="mx-2 text-gray-400">/</span>
              </li>
              <li className="text-gray-900 font-semibold">
                Produk
              </li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Semua Produk</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter */}
          <div className="w-full md:w-64 flex-shrink-0">
             <FilterSidebar />
          </div>

          <main className="flex-1">
            {/* Toolbar Atas */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <span className="text-sm text-gray-600">
                Menampilkan <strong>{allProducts.length}</strong> produk
              </span>
              
              <div className="relative">
                <select className="appearance-none border border-gray-300 rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer hover:border-gray-400 transition-colors">
                  <option value="newest">Paling Baru</option>
                  <option value="popular">Paling Populer</option>
                  <option value="price_asc">Harga Terendah</option>
                  <option value="price_desc">Harga Tertinggi</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Grid Produk */}
            {allProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.map((product) => (
                  // Gunakan product.id sebagai key, lebih unik daripada index
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              // Tampilan jika produk kosong / error fetch
              <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                <div className="bg-red-100 p-3 rounded-full mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Produk Tidak Ditemukan</h3>
                <p className="text-gray-500 mt-1 max-w-sm">
                  Kami tidak dapat memuat data produk saat ini. Silakan coba muat ulang halaman.
                </p>
              </div>
            )}

            {/* Pagination (Dummy UI) */}
            {allProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex space-x-2">
                  <span className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">1</span>
                  <Link href="#" className="text-gray-700 bg-white px-4 py-2 rounded-md hover:bg-gray-50 border border-gray-300 text-sm font-medium transition-colors">2</Link>
                  <Link href="#" className="text-gray-700 bg-white px-4 py-2 rounded-md hover:bg-gray-50 border border-gray-300 text-sm font-medium transition-colors">3</Link>
                  <span className="text-gray-500 px-2 py-2">...</span>
                  <Link href="#" className="text-gray-700 bg-white px-4 py-2 rounded-md hover:bg-gray-50 border border-gray-300 text-sm font-medium transition-colors">Next &gt;</Link>
                </nav>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}