"use client";

import { getAllMedicines } from "@/actions/medicine.action";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type Medicine = {
  id: string;
  med_name: string;
  med_des: string;
  manufacturer: string;
  stock_quantity: string;   
  expiry_date: string;    
  image_url: string;
  seller_id: string;
  category_id: string;
  price: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};





export default function AllMedicineList() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await getAllMedicines();
        if (res?.data?.success) {
          setMedicines(res.data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch medicines", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-sm text-muted-foreground">
        Loading medicines...
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold my-2 mx-4">Medicine List</h1>
      <Card className="w-full rounded-2xl shadow-sm">
        <CardContent className="p-3 sm:p-6">
          {/* Desktop Table */}
          <div className="hidden md:block w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Manufacturer</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicines.map((med) => (
                  <TableRow key={med.id}>
                    <TableCell>
                      <div className="relative h-14 w-14 rounded-lg overflow-hidden border">
                        <Image
                          src={med.image_url}
                          alt={med.med_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{med.med_name}</TableCell>
                    <TableCell className="max-w-[260px] truncate">
                      {med.med_des}
                    </TableCell>
                    <TableCell>{med.manufacturer}</TableCell>
                    <TableCell>{med.stock_quantity}</TableCell>
                    <TableCell>{med.price ?? "—"}</TableCell>
                    <TableCell>
                      {new Date(med.expiry_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {med.is_active ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell>
                      {new Date(med.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {medicines.map((med) => (
              <div
                key={med.id}
                className="rounded-2xl border p-4 shadow-sm space-y-3"
              >
                <div className="flex gap-3 items-center">
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden border">
                    <Image
                      src={med.image_url}
                      alt={med.med_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-base">{med.med_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {med.manufacturer}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {med.med_des}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Stock:</span> {med.stock_quantity}
                  </div>
                  <div>
                    <span className="font-medium">Price:</span> {med.price ?? "—"}
                  </div>
                  <div>
                    <span className="font-medium">Expiry:</span>{" "}
                    {new Date(med.expiry_date).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>{" "}
                    {med.is_active ? "Active" : "Inactive"}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Created: {new Date(med.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
