import { CartItem } from "@/core/entities/cart";

export const mockCartItems: CartItem[] = [
  {
    id: "cart-1",
    productId: "1",
    name: "Samsung S25 Ultra",
    details: "256GB, Hitam",
    imageUrl: "/images/galaxy-s24-ultra.png", // Ganti dengan path gambar
    price: 23332333, // Harga per unit
    quantity: 1,
  },
  {
    id: "cart-2",
    productId: "2",
    name: "iPhone 15 Pro",
    details: "128GB, Natural Titanium",
    imageUrl: "/images/iphone-15-pro.png", // Ganti dengan path gambar
    price: 17999000,
    quantity: 1,
  },
  {
    id: "cart-3",
    productId: "3",
    name: "MacBook Pro 14\"",
    details: "M3 Pro, 512GB, Space Gray",
    imageUrl: "/images/macbook-pro-m3.png", // Ganti dengan path gambar
    price: 32999000,
    quantity: 1,
  },
];