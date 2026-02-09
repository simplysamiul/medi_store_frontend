"use server"

import { UpdateMed } from "@/components/dashboard/seller/EditMedicineModal";
import { medicineService } from "@/services/medicine.service";
import { MedicineType } from "@/types";


export const getAllMedicines = async () => {
    return await medicineService.getMedicines("");
};

export const postMedicine = async (medicineInfo:MedicineType) => {
    return await medicineService.postAMedicine(medicineInfo);
};

export const updateMedicineById = async ({updatedMedicine, medId}:{updatedMedicine:UpdateMed, medId:string}) => {
    return await medicineService.updateMedicineById({updatedMedicine, medId});
};

export const deleteMedicineById = async (medicineId:string) => {
    return await medicineService.deleteMedicineById(medicineId as string);
};