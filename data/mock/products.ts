import { Product } from "@/core/entities/product";

export const featuredProducts: Product[] = [
  {
    id: 1, // Ubah string ke number
    name: "iPhone 15 Pro Max",
    price: "21999000.00", // Ubah ke string sesuai API
    image: "/images/iphone.png", // Ganti imageUrl jadi image
    memory: "256GB", // Tambahkan field wajib
    color: "Natural Titanium", // Tambahkan field wajib
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: "18999000.00",
    image: "/images/iphone.png",
    memory: "512GB",
    color: "Titanium Gray",
  },
  {
    id: 3,
    name: "MacBook Pro M3 14\"",
    price: "32999000.00",
    image: "/images/iphone.png",
    memory: "512GB",
    color: "Space Black",
  },
  {
    id: 4,
    name: "Apple Watch Ultra 2",
    price: "13999000.00",
    image: "/images/iphone.png",
    memory: "N/A",
    color: "Titanium",
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    price: "5499000.00",
    image: "/images/iphone.png",
    memory: "N/A",
    color: "Black",
  },
  {
    id: 6,
    name: "iPad Pro M2 12.9\"",
    price: "18999000.00",
    image: "/images/iphone.png",
    memory: "128GB",
    color: "Space Gray",
  },
  {
    id: 7,
    name: "Dell XPS 15",
    price: "28999000.00",
    image: "/images/iphone.png",
    memory: "1TB",
    color: "Platinum Silver",
  },
  {
    id: 8,
    name: "Google Pixel 8 Pro",
    price: "14999000.00",
    image: "/images/iphone.png",
    memory: "128GB",
    color: "Bay Blue",
  },
];