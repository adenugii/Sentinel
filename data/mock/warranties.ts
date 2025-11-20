// Definisi tipe (bisa dipindah ke core/entities/warranty.ts jika mau lebih rapi)
export interface WarrantyItem {
  id: string;
  name: string;
  imageUrl: string;
  purchaseDate: string;
  expiryDate: string;
  detailUrl: string;
}

export interface WarrantyDetail {
  product: {
    name: string;
    model: string;
    purchasedFrom: string;
    purchaseDate: string;
    warrantyPeriod: string;
    imageUrl: string;
  };
  transaction: {
    id: string;
    certificateId: string;
  };
  blockchain: {
    status: "verified" | "pending" | "failed";
    transactionHash: string;
    blockNumber: string;
    verifiedOn: string;
    polygonScanUrl: string;
  };
}

// Mock Data List
export const mockWarranties: WarrantyItem[] = [
  {
    id: "1",
    name: "Samsung Galaxy S25 Ultra",
    imageUrl: "/images/galaxy-s24-ultra.png", 
    purchaseDate: "3 November 2025",
    expiryDate: "3 November 2026",
    detailUrl: "/account/warranties/1",
  },
  {
    id: "2",
    name: "Apple iPhone 15 Pro Max",
    imageUrl: "/images/iphone-15-pro.png", 
    purchaseDate: "15 September 2025",
    expiryDate: "15 September 2026",
    detailUrl: "/account/warranties/2",
  },
];

// Mock Data Details
export const mockWarrantyDetails: Record<string, WarrantyDetail> = {
  "1": {
    product: {
      name: "iPhone 15 Pro Max",
      model: "A2848",
      purchasedFrom: "Apple Store Online",
      purchaseDate: "3 November 2025",
      warrantyPeriod: "1 Tahun (Berakhir pada 3 November 2026)",
      imageUrl: "/images/iphone-15-pro.png",
    },
    transaction: {
      id: "SENTINEL-11XA34",
      certificateId: "CERT-2025-11-03-XA34-8F92",
    },
    blockchain: {
      status: "verified",
      transactionHash: "0x7f3a9b2c8d1e4f5a8b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
      blockNumber: "45,892,341",
      verifiedOn: "3 November 2025, 14:32 UTC",
      polygonScanUrl: "https://polygonscan.com/tx/0x7f3a9b2c8d1e4f5a8b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
    },
  },
};