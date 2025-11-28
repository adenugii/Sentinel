'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import CertificateInfo from "@/app/(main)/(sections-warranty-detail)/CertificateInfo";
import BlockchainVerification from "@/app/(main)/(sections-warranty-detail)/BlockchainVerification";
import { warrantyService, WarrantyDetail } from "@/core/services/warrantyService";
import { useParams } from "next/navigation";

export default function CertificateDetailPage() {
  const params = useParams();
  const certificateId = params.certificateId as string;

  const [details, setDetails] = useState<WarrantyDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (certificateId) {
        try {
          const data = await warrantyService.getWarrantyDetail(certificateId);
          setDetails(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchDetail();
  }, [certificateId]);

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-700" />
      </div>
    );
  }

  if (!details) {
    return (
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center pt-20">
          <p className="text-xl text-gray-600 mb-4">Sertifikat garansi tidak ditemukan atau akses ditolak.</p>
          <Link href="/account/warranties" className="text-blue-700 font-bold hover:underline">
             &larr; Kembali ke Daftar Garansi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Kembali ke Garansi Saya */}
        <Link href="/account/warranties" className="flex items-center text-blue-700 hover:text-blue-800 text-sm font-semibold mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Garansi Saya
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Detail Garansi</h1>
        
        {/* Informasi Sertifikat */}
        <div className="mb-8">
          <CertificateInfo detail={details} />
        </div>

        {/* Verifikasi Blockchain */}
        <div className="mb-8">
          <BlockchainVerification 
            status={details.on_chain_status === 'confirmed' ? 'verified' : 'pending'}
            transactionHash={details.blockchain_tx_hash}
            blockNumber={details.blockchain_metadata?.block_number?.toString() || "-"}
            verifiedOn={details.blockchain_metadata?.verified_on_local || "-"}
            polygonScanUrl={details.explorer_url}
          />
        </div>
      </div>
    </div>
  );
}