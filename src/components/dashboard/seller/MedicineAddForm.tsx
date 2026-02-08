"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getCategories } from "@/actions/categoy.action";
import { toast } from "react-toastify";
import { CategoryType, MedicineType } from "@/types";
import { authClient } from "@/lib/auth-client";
import { postMedicine } from "@/actions/medicine.action";

/* =========================
   VALIDATION SCHEMA
========================= */

const medicineSchema = z.object({
  med_name: z.string().min(1, "Medicine name is required"),
  med_des: z.string().min(10, "Description is too short"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  stock_quantity: z.string().min(1, "Stock quantity is required"),
  expiry_date: z
    .string()
    .refine((value) => {
      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      selected.setHours(0, 0, 0, 0);
      return selected > today;
    }, "Expiry date must be after today"),
  image_url: z.string().url("Invalid image URL"),
  category_id: z.string().min(1, "Category is required"),
  price: z.string().optional(),
});

type MedicineFormValues = z.infer<typeof medicineSchema>;

/* =========================
   PAGE
========================= */

export default function AddMedicinePage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);

  // get seller info 
  const seassion = authClient.useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MedicineFormValues>({
    resolver: zodResolver(medicineSchema),
  });

  /* =========================
     FETCH CATEGORIES
  ========================= */

  useEffect(() => {
    (async () => {
      const { data } = await getCategories();
      setCategories(data.data);
    })()
  }, []);

  /* =========================
     SUBMIT HANDLER
  ========================= */


  const onSubmit = async (data: MedicineFormValues) => {
    try {
      if (seassion.data?.user.id) {
        setLoading(true);
        const medicineInfo:MedicineType = {
          ...data,
          expiry_date: new Date(data.expiry_date),
          seller_id: seassion.data?.user.id
        }

        // post medicine
        const res = await postMedicine(medicineInfo);
        if(res.data.success){
          reset();
          toast.success("Medicine added successfully");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* ===== TITLE ===== */}
      <h1 className="text-2xl font-bold mb-6">Add Medicine</h1>

      <Card>
        <CardHeader>
          <CardTitle>Medicine Information</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Medicine Name */}
            <div>
              <Label>Medicine Name</Label>
              <Input {...register("med_name")} className="border border-gray-400 mt-2" />
              {errors.med_name && (
                <p className="text-sm text-red-500">
                  {errors.med_name.message}
                </p>
              )}
            </div>

            {/* Manufacturer */}
            <div>
              <Label>Manufacturer</Label>
              <Input {...register("manufacturer")} className="border border-gray-400 mt-2" />
              {errors.manufacturer && (
                <p className="text-sm text-red-500">
                  {errors.manufacturer.message}
                </p>
              )}
            </div>

            {/* Stock */}
            <div>
              <Label>Stock Quantity</Label>
              <Input {...register("stock_quantity")} className="border border-gray-400 mt-2" />
              {errors.stock_quantity && (
                <p className="text-sm text-red-500">
                  {errors.stock_quantity.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <Label>Price </Label>
              <Input {...register("price")} className="border border-gray-400 mt-2" />
            </div>

            {/* Expiry Date */}
            <div>
              <Label>Expiry Date</Label>
              <Input
                className="border border-gray-400 mt-2"
                type="date"
                min={new Date(Date.now() + 86400000)
                  .toISOString()
                  .split("T")[0]}
                {...register("expiry_date")}
              />
              {errors.expiry_date && (
                <p className="text-sm text-red-500">
                  {errors.expiry_date.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <select
                {...register("category_id")}
                className="w-full border rounded-md px-3 py-2 border-gray-400 mt-2"
              >
                <option value="">Select category</option>
                {categories.map((cat: CategoryType) => (
                  <option key={cat.id} value={cat.id}>
                    {cat?.category_name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-sm text-red-500">
                  {errors.category_id.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div className="md:col-span-2">
              <Label>Image URL</Label>
              <Input {...register("image_url")} className="border border-gray-400 mt-2" />
              {errors.image_url && (
                <p className="text-sm text-red-500">
                  {errors.image_url.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea {...register("med_des")} className="border border-gray-400 mt-2" />
              {errors.med_des && (
                <p className="text-sm text-red-500">
                  {errors.med_des.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-800"
                disabled={loading}
              >
                {loading ? "Adding Medicine..." : "Add Medicine"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
