"use server"

import { medicineService } from "@/services/medicine.service";
import { MedicineType } from "@/types";


export const postMedicine = async (medicineInfo:MedicineType) => {
    return await medicineService.postAMedicine(medicineInfo);
};

export const deleteMedicineById = async (medicineId:string) => {
    return await medicineService.deleteMedicineById(medicineId as string);
};