import { Database, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export default function WhyChooseSection() {
  const features = [
    {
      icon: Database,
      title: "Keamanan Blockchain",
      desc: "Data garansi tersimpan abadi dalam blok terdesentralisasi. Anti-manipulasi dan transparan.",
      color: "text-blue-400",
      bgGlow: "group-hover:shadow-blue-500/50",
    },
    {
      icon: Clock,
      title: "Akses Kapan Saja",
      desc: "Kehilangan nota fisik bukan masalah lagi. Sertifikat digital aksesibel 24/7 dari dashboard Anda.",
      color: "text-emerald-400",
      bgGlow: "group-hover:shadow-emerald-500/50",
    },
    {
      icon: ShieldCheck,
      title: "Verifikasi Instan",
      desc: "Service center hanya perlu scan QR Code untuk memvalidasi keaslian garansi dalam hitungan detik.",
      color: "text-purple-400",
      bgGlow: "group-hover:shadow-purple-500/50",
    },
  ];

  return (
    <section className="relative py-20 bg-[#0B1120] overflow-hidden text-white">
      
      {/* BACKGROUND ORNAMENTS (Hiasan Visual) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Mengapa Memilih <span className="text-blue-500">Sentinel?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Standar baru keamanan purna jual gawai dengan teknologi masa depan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Icon Container dengan Glow */}
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 shadow-lg ${item.bgGlow}`}>
                  <Icon className={`w-7 h-7 ${item.color}`} />
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Dekorasi Arrow (Muncul saat hover) */}
                <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                  <span>Pelajari lebih lanjut</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}