import Marquee from "@/components/marquie";
import BannerSection from "@/components/BannerSection";
import PriceIncreaseSection from "@/components/PriceIncreaseSection";
import PriceDecreaseSection from "@/components/PriceDecreaseSection";
import AllProductsSection from "@/components/AllProductsSection";

export default function Home() {
  return (
    <div>
      <main>
        <Marquee />
      </main>
      <main className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <BannerSection />
        </div>
        <PriceIncreaseSection />
        <PriceDecreaseSection />
        <AllProductsSection />
      </main>
    </div>
  );
}
