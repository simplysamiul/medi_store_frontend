"use server"

import { medicineService } from "@/services/medicine.service";
import { MedicineType } from "@/types";

export const postMedicine = async (medicineInfo:MedicineType) => {
    return await medicineService.postAMedicine(medicineInfo);
}