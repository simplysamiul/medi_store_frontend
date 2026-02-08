
import { MedicineType } from '@/types';
import { MedicineCard } from './MedicineCard';
import { medicineService } from '@/services/medicine.service';

const AllMedicines = async () => {
    const {data} = await medicineService.getMedicines("");
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {
                data.data.map((medicine: MedicineType) => <MedicineCard key={medicine.id} medicine={medicine} />)
            }
        </div>
    );
};

export default AllMedicines;