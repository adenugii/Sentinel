// core/services/warrantyService.ts
import apiClient from '@/lib/apiClient';

// Tipe Data untuk List (Get All)
export interface WarrantyItem {
  id: number;
  blockchain_tx_hash: string;
  purchase_timestamp: string;
  warranty_period_months: number;
  status: string;
  on_chain_status: string;
  product_name: string;
  product_image: string[]; // API mengembalikan Array string
  product_sku: string;
  expiry_date: string;
  is_active: boolean;
}

// Tipe Data untuk Detail (Get One)
export interface WarrantyDetail {
  id: number;
  transaction_id: number;
  user_id: number;
  product_id: number;
  purchase_timestamp: string;
  warranty_period_months: number;
  blockchain_tx_hash: string;
  on_chain_status: string;
  status: string;
  product_name: string;
  product_image: string | string[]; // Jaga-jaga jika BE kirim string atau array
  product_desc: string;
  product_sku: string;
  owner_name: string;
  owner_email: string;
  expiry_date: string;
  days_remaining: number;
  is_active: boolean;
  explorer_url: string;
  blockchain_metadata: {
    block_number: number;
    verified_on: string;
    verified_on_local: string;
    network_status: string;
  };
}

export const warrantyService = {
  // GET All Warranties
  getMyWarranties: async (): Promise<WarrantyItem[]> => {
    try {
      const response = await apiClient.get<{ success: boolean; data: WarrantyItem[] }>('/warranties');
      return response.data.data || [];
    } catch (error: any) {
      console.error("Gagal mengambil daftar garansi:", error);
      return [];
    }
  },

  // GET Warranty Detail
  getWarrantyDetail: async (id: string): Promise<WarrantyDetail | null> => {
    try {
      const response = await apiClient.get<{ success: boolean; data: WarrantyDetail }>(`/warranties/${id}`);
      return response.data.data;
    } catch (error: any) {
      console.error(`Gagal mengambil detail garansi ${id}:`, error);
      return null;
    }
  }
};