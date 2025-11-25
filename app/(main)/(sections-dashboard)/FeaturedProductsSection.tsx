import ProductCard from "@/components/domain/ProductCard";
import { productService } from "@/core/services/productService"; // 1. Import Service

const FeaturedProductsSection = async () => {
  // 2. Fetch Data Asli dari API
  // Karena ini Server Component, kita bisa panggil service langsung tanpa useEffect
  const allProducts = await productService.getAllProducts();

  // 3. Ambil 4 produk pertama saja untuk ditampilkan sebagai "Featured"
  const featuredList = allProducts.slice(0, 4);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Produk Unggulan
        </h2>
        
        {featuredList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // Fallback jika API kosong/error
          <div className="text-center text-gray-500 py-10">
            <p>Belum ada produk unggulan saat ini.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsSection;