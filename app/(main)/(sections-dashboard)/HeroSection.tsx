import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative bg-[#0E182D] text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-bg.png"
          alt="Hero background"
          fill
          style={{ objectFit: "contain" }}
          className="opacity-40"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Gawai Resmi. Garansi Aman Selamanya.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Sentinel mengamankan bukti pembelian Anda dengan teknologi
          blockchain. Ucapkan selamat tinggal pada nota fisik.
        </p>
        <Link
          href="/products"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg"
        >
          Belanja Sekarang
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;