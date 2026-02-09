"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { deleteMedicineById } from "@/actions/medicine.action";
import { toast } from "react-toastify";
import EditMedicineModal from "./EditMedicineModal";

export interface MedicineType {
    id: string;
    med_name: string;
    manufacturer: string;
    stock_quantity: string;
    expiry_date: string;
    image_url: string;
    med_des: string;
    category_id: string;
    seller_id: string;
    price: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}


export default function ManageMedicineTable({
    medicines,
    onEdit,
}: {
    medicines?: MedicineType[];
    onEdit?: (med: MedicineType) => void;
    onDelete?: (id: string) => void;
}) {
    const [search, setSearch] = useState("");
    const [editingMedicine, setEditingMedicine] = useState<MedicineType | null>(null);


    const filtered = useMemo(() => {
        if (!search) return medicines;
        return medicines?.filter((m) =>
            m.med_name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, medicines]);

    return (
        <div className="w-full p-4 md:p-6">
            <Card className="rounded-2xl shadow-md">
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <CardTitle className="text-xl md:text-2xl font-bold">
                        Manage Medicine
                    </CardTitle>

                    <Input
                        placeholder="Search medicine..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="md:max-w-sm"
                    />
                </CardHeader>

                <CardContent>
                    {/* ===== DESKTOP TABLE ===== */}
                    <div className="hidden md:block rounded-xl border overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Manufacturer</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Expiry</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filtered?.map((med) => (
                                    <TableRow key={med.id}>
                                        <TableCell>
                                            <div className="relative w-14 h-14 rounded-lg overflow-hidden border">
                                                <Image
                                                    src={med.image_url}
                                                    alt={med.med_name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </TableCell>

                                        <TableCell className="font-medium">
                                            {med.med_name}
                                        </TableCell>

                                        <TableCell>{med.manufacturer}</TableCell>

                                        <TableCell>{med.price ? med.price : "10"}</TableCell>

                                        <TableCell>{med.stock_quantity}</TableCell>

                                        <TableCell>
                                            {new Date(med.expiry_date).toLocaleDateString()}
                                        </TableCell>

                                        <TableCell>
                                            <Badge variant={med.is_active ? "default" : "secondary"}>
                                                {med.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => setEditingMedicine(med)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>


                                            <DeleteButton
                                                id={med.id}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* ===== MOBILE CARDS ===== */}
                    <div className="grid gap-4 md:hidden">
                        {filtered?.map((med) => (
                            <Card key={med.id} className="rounded-xl border shadow-sm">
                                <CardContent className="p-4 space-y-3">
                                    <div className="flex gap-4">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                                            <Image
                                                src={med.image_url}
                                                alt={med.med_name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <p className="font-semibold">{med.med_name}</p>
                                            <p className="text-sm opacity-70">
                                                {med.manufacturer}
                                            </p>
                                            <Badge className="mt-1">
                                                Stock: {med.stock_quantity}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm">
                                            Exp: {new Date(med.expiry_date).toLocaleDateString()}
                                        </span>

                                        <div className="flex gap-2">
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => setEditingMedicine(med)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>


                                            <DeleteButton
                                                id={med.id}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* edit modal  */}
            <EditMedicineModal
                open={!!editingMedicine}
                medicine={editingMedicine}
                onClose={() => setEditingMedicine(null)}
                onSuccess={() => {
                    setEditingMedicine(null);
                    toast.success("Medicine updated successfully");
                }}
            />

        </div>
    );
}

/* ================= DELETE DIALOG ================= */

function DeleteButton({ id, }: { id: string }) {

    const handleDelete = async (id: string) => {
        const res = await deleteMedicineById(id);
        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="icon" variant="destructive">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete medicine?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove the
                        medicine.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="hover:border hover:border-red-500">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 hover:bg-red-700" onClick={() => handleDelete(id)}>
                        Yes, Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
