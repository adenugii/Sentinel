import FaqAccordion from "../(sections-faq)/FaqAccordion";
import Link from "next/link";
import { faqService } from "@/services/faqService"; // <-- Import Service

export default async function FaqPage() {
  // PANGGIL SERVICE
  const faqItems = await faqService.getAllFaqs();

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="bg-gray-50 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Ada Pertanyaan?
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Kami siap membantu Anda.
          </p>
        </div>
      </section>

      {/* 2. FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pertanyaan Populer
          </h2>
          
          <FaqAccordion items={faqItems} />

          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">Masih ada pertanyaan lain?</p>
            <Link
              href="#"
              className="bg-blue-700 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-800 transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}