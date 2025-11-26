import { Award, Send, Lock } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      title: "Beli Gawai Resmi",
      desc: "Semua gawai di Sentinel 100% dijamin resmi dari mitra terverifikasi.",
      icon: Award,
    },
    {
      id: 2,
      title: "Sertifikat Otomatis",
      desc: "Setelah pesanan selesai, Sertifikat Garansi Digital otomatis terbit.",
      icon: Send,
    },
    {
      id: 3,
      title: "Aman Anti Hilang",
      desc: "Bukti pembelian dicatat di blockchain. Aman dan valid selamanya.",
      icon: Lock,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Semudah 1-2-3
          </h2>
          <p className="text-gray-500 mt-2">
            Proses yang transparan untuk keamanan gawai Anda.
          </p>
        </div>
        
        <div className="relative">
          {/* GARIS PENGHUBUNG (Desktop Only) */}
          {/* Ditaruh absolute di tengah vertical ikon */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-1 bg-gray-100 -z-0">
             {/* Garis progress visual (opsional, bisa dibuat gradient) */}
             <div className="h-full w-full bg-gradient-to-r from-blue-100 via-green-100 to-blue-100"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="group flex flex-col items-center text-center">
                  
                  {/* ICON WRAPPER */}
                  <div className="relative mb-6 transition-transform duration-300 group-hover:scale-110 cursor-default">
                    {/* Circle Background */}
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-blue-50 flex items-center justify-center shadow-sm group-hover:border-blue-200 group-hover:shadow-md transition-all">
                      <Icon className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
                    </div>
                    
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">
                      {step.id}
                    </div>
                  </div>

                  {/* TEXT CONTENT */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                  
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}