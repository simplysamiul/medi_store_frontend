import HeroSection from "@/components/home/HeroSection";
import ItemsSection from "@/components/home/ItemsSection";
import AllMedicines from "@/components/modules/AllMedicines";
import FeaturedSection from "@/components/modules/FeaturedSection";


export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <ItemsSection />
      <AllMedicines />
      <FeaturedSection />
    </>
  );
}
