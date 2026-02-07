import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { medicineTyepe } from "@/types/medicine.types";
import { categoryService } from "@/services/category.service";
import Link from "next/link";

export async function MedicineCard({ medicine }: { medicine: medicineTyepe }) {
    const { med_name, manufacturer, image_url, stock_quantity, category_id, id } = medicine;
    const { data } = await categoryService.getCategoryById(category_id);
    return (
        <Card className="w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative w-full h-56 sm:h-64 ">
                <Link href={`/medicines/${id}`}>
                    <Image
                        src={image_url}
                        alt={med_name}
                        loading="eager"
                        sizes="100"
                        fill
                        className="object-contain p-6"
                    />
                </Link>
            </div>


            <CardContent className="p-4 sm:p-5 space-y-3">
                {/* Top Row */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                        {manufacturer}
                    </span>


                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                        Stock: {stock_quantity}
                    </span>
                </div>


                {/* Title */}
                <div>
                    <h3 className="text-lg font-semibold leading-tight">{med_name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{data.data?.category_name}</p>
                </div>


                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-2">
                    <p className="text-xl font-bold">$ 10.00</p>


                    <Button
                        size="icon"
                        className="rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200"
                    >
                        <ShoppingCart />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}