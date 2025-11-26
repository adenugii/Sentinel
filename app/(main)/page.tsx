import HeroSection from "./(sections-dashboard)/HeroSection";
import TrustBarSection from "./(sections-dashboard)/TrustBarSection";
import HowItWorksSection from "./(sections-dashboard)/HowItWorksSection";
import FeaturedProductsSection from "./(sections-dashboard)/FeaturedProductsSection";
import WhyChooseSection from "./(sections-dashboard)/WhyChooseSection";
import ScrollReveal from "@/components/ui/ScrollReveal"; // <-- Import Komponen Baru

export default function HomePage() {
  return (
    <div className="">
      <main>
        {/* Hero tidak perlu di-animasi scroll karena dia muncul pertama kali load */}
        <HeroSection />

        {/* Bungkus section lainnya dengan ScrollReveal */}
        <ScrollReveal>
          <TrustBarSection />
        </ScrollReveal>

        <ScrollReveal>
          <HowItWorksSection />
        </ScrollReveal>

        <ScrollReveal>
          <FeaturedProductsSection />
        </ScrollReveal>

        <ScrollReveal>
          <WhyChooseSection />
        </ScrollReveal>
      </main>
    </div>
  );
}