import { mockWarranties, mockWarrantyDetails, WarrantyItem, WarrantyDetail } from "@/data/mock/warranties";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const warrantyService = {
  // Mengambil daftar garansi user
  getMyWarranties: async (): Promise<WarrantyItem[]> => {
    await delay(800);
    return mockWarranties;
  },

  // Mengambil detail sertifikat garansi
  getWarrantyDetail: async (certificateId: string): Promise<WarrantyDetail | null> => {
    await delay(1000); // Simulasi validasi blockchain (lama)
    return mockWarrantyDetails[certificateId] || null;
  }
};