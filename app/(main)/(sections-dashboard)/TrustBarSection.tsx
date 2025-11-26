import { ShieldCheck, LockKeyhole, CheckCircle } from "lucide-react";

export default function TrustBarSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: "100% Resmi",
      desc: "Semua produk dijamin orisinalitasnya dari distributor resmi.",
      color: "text-blue-600",
      bg: "bg-blue-50 group-hover:bg-blue-100",
    },
    {
      icon: LockKeyhole,
      title: "Garansi Digital",
      desc: "Bukti pembelian Anda kami jaga keamanannya di blockchain.",
      color: "text-green-600",
      bg: "bg-green-50 group-hover:bg-green-100",
    },
    {
      icon: CheckCircle,
      title: "Terverifikasi",
      desc: "Teknologi tepercaya menjamin keabsahan garansi Anda.",
      color: "text-purple-600",
      bg: "bg-purple-50 group-hover:bg-purple-100",
    },
  ];

  return (
    // PENTING: bg-white dan relative z-10 agar menutupi gambar Hero saat scroll
    <section className="bg-white py-16 relative z-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx}
                className="group p-6 rounded-2xl border border-transparent hover:border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out text-center cursor-default bg-white"
              >
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${feature.bg}`}>
                  <Icon className={`w-8 h-8 transition-transform duration-300 group-hover:scale-110 ${feature.color}`} />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}