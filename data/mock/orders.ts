import { Order, OrderDetail } from "@/core/entities/order";

// 1. MOCK DATA UNTUK HALAMAN DAFTAR PESANAN
// (app/account/orders/page.tsx)
export const mockOrders: Order[] = [
  {
    id: "1",
    orderId: "SEN-11XA34", // Disesuaikan dengan desain detail
    date: "3 November 2025",
    items: "Samsung Galaxy S24 Ultra (1x)",
    total: 14999000,
    status: "Sedang Diproses", // Disesuaikan dengan desain detail
  },
  {
    id: "2",
    orderId: "SEN-123457",
    date: "5 November 2025",
    items: "iPhone 15 Pro (1x) + 2 item lain",
    total: 28500000,
    status: "Menunggu Pembayaran",
  },
  {
    id: "3",
    orderId: "SEN-123458",
    date: "1 November 2025",
    items: "MacBook Pro M4 (1x)",
    total: 35999000,
    status: "Dibatalkan",
  },
  {
    id: "4",
    orderId: "SEN-123459",
    date: "7 November 2025",
    items: "Google Pixel 9 Pro (1x)",
    total: 16999000,
    status: "Selesai", // Ganti dari desain sebelumnya agar datanya variatif
  },
];

// 2. MOCK DATA UNTUK HALAMAN DETAIL PESANAN
// (app/account/orders/[orderId]/page.tsx)
// Data ini sekarang dipindahkan kembali ke file mock
export const mockOrderDetailData: Record<string, OrderDetail> = {
  // Data untuk ID "1" (SEN-11XA34)
  "1": {
    id: "1",
    orderId: "SEN-11XA34",
    date: "3 November 2025",
    status: "Sedang Diproses",
    totalPayment: 14999000,
    purchasedItems: [
      {
        id: "p1",
        name: "Samsung Galaxy S24 Ultra",
        imageUrl: "/images/galaxy-s24-ultra.png", // Pastikan path gambar ini ada
        model: "SM-S928B/DS",
        isEligible: true,
        quantity: 1,
        unitPrice: 14999000,
        subtotal: 14999000,
      },
    ],
    shippingDetails: {
      recipientName: "John Smith", // Sesuai desain
      shippingAddress:
        "Jl. Sudirman No. 123, RT.005/RW.002 Kelurahan Senayan, Kecamatan Kebayoran Baru Jakarta Selatan, DKI Jakarta 12190",
      estimatedDelivery: "6 November 2025",
    },
    paymentDetails: {
      paymentMethod: "Virtual Account BCA",
      paymentStatus: "Lunas",
      transactionRefId: "TRX-BCA-20251103-8976543210",
    },
  },
  // Contoh untuk ID "2"
  "2": {
    id: "2",
    orderId: "SEN-123457",
    date: "5 November 2025",
    status: "Menunggu Pembayaran",
    totalPayment: 28500000,
    purchasedItems: [
      {
        id: "p2",
        name: "iPhone 15 Pro",
        imageUrl: "/images/iphone-15-pro.png", // Ganti path
        model: "A2848",
        isEligible: true,
        quantity: 1,
        unitPrice: 20000000,
        subtotal: 20000000,
      },
      {
        id: "p3",
        name: "Apple Watch Ultra 2",
        imageUrl: "/images/apple-watch-ultra.png", // Ganti path
        model: "A2684",
        isEligible: true,
        quantity: 1,
        unitPrice: 8500000,
        subtotal: 8500000,
      },
    ],
    shippingDetails: {
      recipientName: "John Smith",
      shippingAddress:
        "Jl. Sudirman No. 123, RT.005/RW.002 Kelurahan Senayan, Kecamatan Kebayoran Baru Jakarta Selatan, DKI Jakarta 12190",
      estimatedDelivery: "8 November 2025",
    },
    paymentDetails: {
      paymentMethod: "Virtual Account Mandiri",
      paymentStatus: "Menunggu",
      transactionRefId: "TRX-MDR-20251105-12345678",
    },
  },
};