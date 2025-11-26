import { productService } from "@/core/services/productService";
import ProductCarousel from "./ProductCarousel"; // Import Client Component tadi

const FeaturedProductsSection = async () => {
  // 1. Fetch Data Asli
  const allProducts = await productService.getAllProducts();

  // 2. Ambil LEBIH BANYAK produk (misal 8) agar carousel bisa berjalan
  // Jika cuma ambil 4, tidak ada yang bisa digeser (statis).
  const featuredList = allProducts.slice(0, 8);

  return (
    <section className="bg-white py-16 overflow-hidden"> {/* overflow-hidden untuk safety */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Produk Unggulan
        </h2>
        
        {featuredList.length > 0 ? (
          // Panggil Client Component untuk Animasi
          <ProductCarousel products={featuredList} />
        ) : (
          <div className="text-center text-gray-500 py-10">
            <p>Belum ada produk unggulan saat ini.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProductsSection;