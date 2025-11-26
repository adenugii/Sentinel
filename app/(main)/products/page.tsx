'use client';

import { useState, useEffect } from "react";
import ProductCard from "@/components/domain/ProductCard";
import { productService } from "@/core/services/productService"; 
import { Product } from "@/core/entities/product";
import { Filter, ChevronDown, SlidersHorizontal, Search, ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk Filter (Mockup logic)
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      
      {/* 1. HEADER BREADCRUMBS (Style Baru) */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm lg:static lg:shadow-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-700 flex items-center transition-colors">
              <Home className="w-4 h-4 mr-1" />
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-300" />
            <span className="text-gray-900 font-medium">
              Semua Produk
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Title Section */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Katalog Produk</h1>
            <p className="text-gray-500 mt-2">Temukan gawai impian Anda dengan garansi blockchain Sentinel.</p>
        </div>
        
        {/* 2. LAYOUT UTAMA */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          {/* === SIDEBAR FILTER (KIRI) === */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              
              {/* Filter Kategori */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Filter className="w-4 h-4 mr-2" /> Kategori
                </h3>
                <div className="space-y-3">
                  {["Semua", "Smartphone", "Tablet", "Laptop", "Aksesoris"].map((cat) => (
                    <label key={cat} className="flex items-center cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category" 
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                      />
                      <span className={`ml-3 text-sm group-hover:text-blue-700 ${selectedCategory === cat ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Harga */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Rentang Harga</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" className="w-full px-3 py-2 border rounded-md text-sm" />
                    <span className="text-gray-400">-</span>
                    <input type="number" placeholder="Max" className="w-full px-3 py-2 border rounded-md text-sm" />
                  </div>
                  <button className="w-full bg-gray-100 text-gray-700 text-sm font-semibold py-2 rounded-md hover:bg-gray-200 transition-colors">
                    Terapkan
                  </button>
                </div>
              </div>

            </div>
          </aside>

          {/* === CONTENT UTAMA (KANAN) === */}
          <main className="flex-1">
            
            {/* Top Bar: Sort & Search Mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <p className="text-gray-500 text-sm">
                Menampilkan <span className="font-bold text-gray-900">{products.length}</span> produk
              </p>
              
              <div className="flex items-center gap-3">
                {/* Tombol Filter Mobile */}
                <button className="lg:hidden flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 shadow-sm">
                  <SlidersHorizontal className="w-4 h-4 mr-2" /> Filter
                </button>

                {/* Dropdown Sort */}
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer">
                    <option>Paling Relevan</option>
                    <option>Harga Terendah</option>
                    <option>Harga Tertinggi</option>
                    <option>Terbaru</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid Produk */}
            {isLoading ? (
              // Skeleton Loading
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg h-96 animate-pulse border border-gray-200"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              // Real Data
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Produk tidak ditemukan</h3>
                <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda.</p>
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
}