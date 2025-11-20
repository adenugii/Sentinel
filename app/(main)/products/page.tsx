import ProductCard from "@/components/domain/ProductCard";
import FilterSidebar from "@/app/(main)/(sections-product-list)/FilterSidebar";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { productService } from "@/services/productService"; // <-- Import Service

export default async function ProductsPage() {
  // PANGGIL SERVICE (Menggantikan import mock langsung)
  const allProducts = await productService.getAllProducts();

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
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
          <FilterSidebar />

          <main className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                Menampilkan 1-{allProducts.length} dari {allProducts.length} produk
              </span>
              <div className="relative">
                <select className="appearance-none border border-gray-300 rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white">
                  <option value="paling-baru">Paling Baru</option>
                  <option value="paling-populer">Paling Populer</option>
                  <option value="harga-terendah">Harga Terendah</option>
                  <option value="harga-tertinggi">Harga Tertinggi</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Grid Produk */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.map((product, index) => (
                <ProductCard key={`${product.id}-${index}`} product={product} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <nav className="flex space-x-2">
                <span className="bg-blue-700 text-white px-4 py-2 rounded-md">1</span>
                <Link href="#" className="text-gray-700 bg-white px-4 py-2 rounded-md hover:bg-gray-100 border border-gray-300">2</Link>
                <Link href="#" className="text-gray-700 bg-white px-4 py-2 rounded-md hover:bg-gray-100 border border-gray-300">3</Link>
                <span className="text-gray-500 px-4 py-2">...</span>
                <Link href="#" className="text-gray-700 bg-white px-4 py-2 rounded-md hover:bg-gray-100 border border-gray-300">Next &gt;</Link>
              </nav>
            </div>
            
          </main>
        </div>
      </div>
    </div>
  );
}