import FaqClient from "@/app/(main)/(sections-faq)/FaqClient";
import { faqService } from "@/core/services/faqService";

export default async function FaqPage() {
  // Fetch data dari server
  const faqItems = await faqService.getAllFaqs();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Kirim data ke Client Component untuk interaktivitas search */}
      <FaqClient initialFaqs={faqItems} />
    </div>
  );
}