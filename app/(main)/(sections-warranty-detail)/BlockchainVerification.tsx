import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface BlockchainVerificationProps {
  status: "verified" | "pending" | "failed";
  transactionHash: string;
  blockNumber: string;
  verifiedOn: string; // Ex: "3 November 2025, 14:32 UTC"
  polygonScanUrl: string;
}

export default function BlockchainVerification({
  status,
  transactionHash,
  blockNumber,
  verifiedOn,
  polygonScanUrl,
}: BlockchainVerificationProps) {
  const statusIcon = status === "verified" ? (
    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2" />
  ) : (
    // Anda bisa tambahkan icon lain untuk pending/failed
    <></>
  );

  const statusText = status === "verified" ? (
    <span className="text-green-600 font-semibold">Terverifikasi</span>
  ) : (
    <span className="text-yellow-600 font-semibold">Menunggu Verifikasi</span>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Verifikasi Blockchain</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
        {/* Status Verifikasi */}
        <div className="flex items-center">
          <span className="font-medium text-gray-600 w-40 flex-shrink-0">Status Verifikasi:</span>
          {statusIcon} {statusText}
        </div>

        {/* Nomor Blok */}
        <div className="flex items-center">
          <span className="font-medium text-gray-600 w-40 flex-shrink-0">Nomor Blok:</span>
          <span className="font-mono text-gray-900">{blockNumber}</span>
        </div>

        {/* Hash Transaksi */}
        <div className="flex items-center">
          <span className="font-medium text-gray-600 w-40 flex-shrink-0">Hash Transaksi:</span>
          <span className="font-mono text-gray-900 break-all">{transactionHash}</span>
        </div>

        {/* Terverifikasi Pada */}
        <div className="flex items-center">
          <span className="font-medium text-gray-600 w-40 flex-shrink-0">Terverifikasi Pada:</span>
          <span className="text-gray-900">{verifiedOn}</span>
        </div>
      </div>

      {/* Link ke PolygonScan */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <Link 
          href={polygonScanUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-700 hover:text-blue-800 text-sm font-semibold flex items-center"
        >
          Lihat di Etherscan {/* <-- DIUBAH */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </div>
  );
}