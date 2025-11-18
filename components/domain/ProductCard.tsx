import { Product } from "@/core/entities/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

// Fungsi helper untuk format Rupiah
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.02]">
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-48">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="p-4"
          />
          {/* Badge Garansi */}
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Garansi Sentinel
          </span>
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">{product.category}</p> {/* Misal: 512GB, Titanium Gray */}
        </Link>
        
        {/* Bagian Harga dan Tombol Cart */}
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg font-bold text-blue-700"> {/* Warna harga diubah ke biru sesuai desain */}
            {formatCurrency(product.price)}
          </p>
          <button 
            className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition-colors"
            aria-label="Tambah ke keranjang"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;