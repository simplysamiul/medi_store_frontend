"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MedicineType } from "./ManageMedicineTable";
import { updateMedicineById } from "@/actions/medicine.action";

interface Props {
    open: boolean;
    medicine: MedicineType | null;
    onClose: () => void;
    onSuccess: () => void;
}

export type UpdateMed = {
    med_name: string;
    manufacturer: string;
    stock_quantity: string;
    price?: string;
    expiry_date: Date | string;
    image_url: string;
    med_des: string;
    is_active: boolean;
};

export default function EditMedicineModal({
    open,
    medicine,
    onClose,
    onSuccess
}: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<UpdateMed>();

    // preload existing data
    useEffect(() => {
        if (medicine) {
            reset({
                med_name: medicine.med_name,
                manufacturer: medicine.manufacturer,
                stock_quantity: medicine.stock_quantity,
                price: medicine.price ?? "",
                expiry_date: medicine.expiry_date.split("T")[0],
                image_url: medicine.image_url,
                med_des: medicine.med_des,
                is_active: medicine.is_active,
            });
        }
    }, [medicine, reset]);

    const onSubmit = async (data: UpdateMed) => {
        if (!medicine) return;
        const updatedMedicine = {
            ...data,
            expiry_date: new Date(data.expiry_date),
        }
        const res = await updateMedicineById({ updatedMedicine, medId: medicine.id, });

        if (res.data.success) {
            onSuccess();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Medicine</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label>Medicine Name</Label>
                        <Input {...register("med_name")} className="border border-gray-400 mt-2" />
                    </div>

                    <div>
                        <Label>Manufacturer</Label>
                        <Input {...register("manufacturer")} className="border border-gray-400 mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Stock</Label>
                            <Input {...register("stock_quantity")} className="border border-gray-400 mt-2" />
                        </div>

                        <div>
                            <Label>Price</Label>
                            <Input {...register("price")} className="border border-gray-400 mt-2" />
                        </div>
                    </div>

                    <div>
                        <Label>Expiry Date</Label>
                        <Input type="date" {...register("expiry_date")} className="border border-gray-400 mt-2" />
                    </div>

                    <div>
                        <Label>Status</Label>
                        <select
                            {...register("is_active", {
                                setValueAs: (v) => v === "true",
                            })}
                            className="w-full border rounded-md px-3 py-2 mt-2 border-gray-400"
                        >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>


                    <div>
                        <Label>Image URL</Label>
                        <Input {...register("image_url")} className="border border-gray-400 mt-2" />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Textarea {...register("med_des")} className="border border-gray-400 mt-2" />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
