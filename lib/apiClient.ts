// Di lokal, ini akan mengarah ke localhost backend Anda nanti
// Atau gunakan mock jika backend belum siap (seperti sekarang)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

type RequestOptions = {
  headers?: Record<string, string>;
  cache?: RequestCache;
  // Opsi lain sesuai kebutuhan fetch API
};

export const apiClient = {
  // Wrapper untuk GET request
  get: async <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      cache: options?.cache || "no-store", // Default: selalu ambil data baru
    });

    if (!res.ok) {
      // Anda bisa handle error global di sini (misal: redirect login jika 401)
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  },

  // Wrapper untuk POST request
  post: async <T>(endpoint: string, body: any, options?: RequestOptions): Promise<T> => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  },
  
  // Bisa tambahkan put, delete, patch, dll.
};