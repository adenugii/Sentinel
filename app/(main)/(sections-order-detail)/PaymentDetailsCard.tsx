import { Landmark, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface PaymentDetailsCardProps {
  paymentMethod: string;
  paymentStatus: string;
  transactionRefId: string;
  redirectUrl?: string; // Tambahan prop
}

export default function PaymentDetailsCard({ paymentMethod, paymentStatus, transactionRefId, redirectUrl }: PaymentDetailsCardProps) {
  
  const renderStatus = () => {
    if (paymentStatus === 'paid') return <span className="inline-flex items-center text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-bold"><CheckCircle className="w-4 h-4 mr-2"/> Lunas</span>;
    if (paymentStatus === 'pending') return <span className="inline-flex items-center text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-xs font-bold"><Clock className="w-4 h-4 mr-2"/> Menunggu</span>;
    return <span className="inline-flex items-center text-red-700 bg-red-100 px-3 py-1 rounded-full text-xs font-bold"><AlertCircle className="w-4 h-4 mr-2"/> Gagal/Batal</span>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Detail Pembayaran</h2>
        {paymentStatus === 'pending' && redirectUrl && (
           <a 
             href={redirectUrl} 
             target="_blank" 
             rel="noreferrer"
             className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-md shadow-sm"
           >
             Lanjutkan Pembayaran
           </a>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <p className="text-gray-500 mb-1">Metode Pembayaran</p>
          <p className="font-medium text-gray-900 flex items-center">
            <Landmark className="w-4 h-4 mr-2 text-blue-700" />
            {paymentMethod}
          </p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Status Pembayaran</p>
          {renderStatus()}
        </div>
        <div>
          <p className="text-gray-500 mb-1">ID Referensi (Payment)</p>
          <p className="font-mono text-gray-900 break-all">{transactionRefId}</p>
        </div>
      </div>
    </div>
  );
}