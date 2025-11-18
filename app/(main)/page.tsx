import HeroSection from "./(sections-dashboard)/HeroSection";
import TrustBarSection from "./(sections-dashboard)/TrustBarSection";
import HowItWorksSection from "./(sections-dashboard)/HowItWorksSection";
import FeaturedProductsSection from "./(sections-dashboard)/FeaturedProductsSection";
import WhyChooseSection from "./(sections-dashboard)/WhyChooseSection";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="bg-gray-50">
      {/* Navbar dan Footer sekarang dihandle oleh layout.tsx */}
      <main>
        <HeroSection />
        <TrustBarSection />
        <HowItWorksSection />
        <FeaturedProductsSection />
        <WhyChooseSection />
      </main>
    </div>
  );
}