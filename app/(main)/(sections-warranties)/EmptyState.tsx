import { Archive, Plus } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="bg-white p-12 rounded-lg shadow-sm text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-100 p-4 rounded-full">
          <Archive className="w-12 h-12 text-gray-400" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-1">
        Belum Ada Gawai Lain? {/* <-- DIUBAH */}
      </h3>
      <p className="text-gray-500 mb-6">
        Daftarkan garansi gawai baru Anda untuk perlindungan maksimal. {/* <-- DIUBAH */}
      </p>
      <button className="bg-blue-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-800 flex items-center justify-center mx-auto">
        <Plus className="w-5 h-5 mr-2" />
        Tambah Gawai Baru {/* <-- DIUBAH */}
      </button>
    </div>
  );
}