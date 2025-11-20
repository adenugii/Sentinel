import { Check, MapPin } from "lucide-react";

interface AddressCardProps {
  isPrimary?: boolean;
  label: string;
  receiverName: string;
  phone: string;
  address: string;
}

export default function AddressCard({ isPrimary, label, receiverName, phone, address }: AddressCardProps) {
  return (
    <div className={`p-6 rounded-lg border ${isPrimary ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center space-x-2 mb-2">
        {isPrimary && (
          <span className="bg-blue-900 text-white text-[10px] font-bold px-2 py-1 rounded">
            UTAMA
          </span>
        )}
        <span className="font-bold text-gray-900">{label}</span>
      </div>

      <h4 className="font-bold text-gray-900 text-lg mb-1">{receiverName}</h4>
      <p className="text-gray-600 mb-1">{phone}</p>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        {address}
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-200/60 gap-4">
        <div className="flex space-x-4 text-sm font-semibold">
          <button className="text-blue-700 hover:text-blue-800">Ubah</button>
          {!isPrimary && <button className="text-red-600 hover:text-red-700">Hapus</button>}
        </div>
        
        {isPrimary ? (
           <button disabled className="flex items-center text-gray-500 text-sm font-medium cursor-default">
             <Check className="w-4 h-4 mr-1" />
             Diatur sebagai Utama
           </button>
        ) : (
          <button className="text-sm font-medium text-gray-500 hover:text-gray-900">
            Atur sebagai Utama
          </button>
        )}
      </div>
    </div>
  );
}