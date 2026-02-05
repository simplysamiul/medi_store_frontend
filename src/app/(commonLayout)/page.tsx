import HeroSection from "@/components/home/HeroSection";
import ItemsSection from "@/components/home/ItemsSection";
import FeaturedSection from "@/components/modules/FeaturedSection";
import { MedicineCard } from "@/components/modules/MedicineCard";
import { medicineService } from "@/services/medicine.service";
import { medicineTyepe } from "@/types/medicine.types";

export default async function HomePage() {
  const {data} = await medicineService.getMedicines();
  console.log(data.data)
  return (
    <>
      <HeroSection />
      <ItemsSection />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {
            data.data.map((medicine:medicineTyepe)=> <MedicineCard key={medicine.id} medicine={medicine}/>)
          }
      </div>
      <FeaturedSection />
    </>
  );
}
