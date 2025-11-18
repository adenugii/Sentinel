import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CertificateInfo from "@/app/(main)/(sections-warranty-detail)/CertificateInfo";
import BlockchainVerification from "@/app/(main)/(sections-warranty-detail)/BlockchainVerification";

// --- Mock Data ---
// Di aplikasi nyata, Anda akan fetch data berdasarkan `params.certificateId`
const getCertificateDetails = async (certificateId: string) => {
  // Simulasi data untuk satu sertifikat
  if (certificateId === "1") { 
    return {
      product: {
        name: "iPhone 15 Pro Max",
        model: "A2848",
        purchasedFrom: "Apple Store Online",
        purchaseDate: "3 November 2025",
        warrantyPeriod: "1 Tahun (Berakhir pada 3 November 2026)", // <-- DIUBAH
        imageUrl: "/images/iphone-15-pro.png", // Ganti dengan gambar iPhone
      },
      transaction: {
        id: "SENTINEL-11XA34",
        certificateId: "CERT-2025-11-03-XA34-8F92",
      },
      blockchain: {
        status: "verified" as const,
        transactionHash: "0x7f3a9b2c8d1e4f5a8b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
        blockNumber: "45,892,341",
        verifiedOn: "3 November 2025, 14:32 UTC",
        polygonScanUrl: "https://polygonscan.com/tx/0x7f3a9b2c8d1e4f5a8b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a",
      },
    };
  }
  return null; // Sertifikat tidak ditemukan
};
// --- Akhir Mock Data ---

export default async function CertificateDetailPage({ params }: { params: { certificateId: string } }) {
  const details = await getCertificateDetails(params.certificateId);

  if (!details) {
    return <div>Sertifikat tidak ditemukan.</div>; // <-- DIUBAH
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Kembali ke Garansi Saya */}
        <Link href="/account/warranties" className="flex items-center text-blue-700 hover:text-blue-800 text-sm font-semibold mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Garansi Saya {/* <-- DIUBAH */}
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Detail Garansi</h1> {/* <-- DIUBAH */}
        
        {/* Informasi Sertifikat */}
        <div className="mb-8">
          <CertificateInfo product={details.product} transaction={details.transaction} />
        </div>

        {/* Verifikasi Blockchain */}
        <div className="mb-8">
          <BlockchainVerification 
            status={details.blockchain.status}
            transactionHash={details.blockchain.transactionHash}
            blockNumber={details.blockchain.blockNumber}
            verifiedOn={details.blockchain.verifiedOn}
            polygonScanUrl={details.blockchain.polygonScanUrl}
          />
        </div>

        {/* Tombol Download PDF */}
        <div className="flex justify-center space-x-4">
          <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Unduh Sertifikat (PDF) {/* <-- DIUBAH */}
          </button>
          <Link href="/account/warranties" className="bg-white text-blue-700 border border-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-50 flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Sertifikat Saya {/* <-- DIUBAH */}
          </Link>
        </div>

      </div>
    </div>
  );
}