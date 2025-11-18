interface ShippingDetailsCardProps {
  recipientName: string;
  shippingAddress: string;
  estimatedDelivery: string;
}

export default function ShippingDetailsCard({ 
  recipientName, shippingAddress, estimatedDelivery 
}: ShippingDetailsCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Detail Pengiriman</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500 mb-1">Nama Penerima</p>
          <p className="font-medium text-gray-900">{recipientName}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-gray-500 mb-1">Alamat Pengiriman</p>
          <p className="font-medium text-gray-900">{shippingAddress}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Estimasi Tiba</p>
          <p className="font-medium text-gray-900">{estimatedDelivery}</p>
        </div>
      </div>
    </div>
  );
}