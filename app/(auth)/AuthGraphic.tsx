import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AuthGraphic() {
  return (
    <div className="relative flex-1 hidden lg:flex flex-col justify-center items-center h-full bg-gray-900 text-white p-12">
      {/* Latar belakang (jika Anda punya gambar seperti di desain) */}
      {/* <Image
        src="/images/auth-bg.png" // Ganti dengan path gambar Anda
        alt="Auth background"
        layout="fill"
        objectFit="cover"
        className="opacity-20"
      /> */}
      
      {/* Konten */}
      <div className="relative z-10 text-center">
        <div className="bg-green-500 p-4 rounded-full inline-block mb-6">
          <ShieldCheck className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Sentinel</h1>
        <p className="text-xl text-gray-300 max-w-sm">
          Buy Official. Warranty Secured Forever on Blockchain.
        </p>
      </div>
    </div>
  );
}