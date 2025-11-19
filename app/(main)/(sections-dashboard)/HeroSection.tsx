import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
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