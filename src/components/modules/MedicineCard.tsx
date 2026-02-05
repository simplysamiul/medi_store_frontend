import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { medicineTyepe } from "@/types/medicine.types";

export function MedicineCard({ medicine }: { medicine: medicineTyepe }) {
    const{med_name, manufacturer, image_url, stock_quantity} = medicine;
    return (
        <Card className="w-full overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative w-full h-56 sm:h-64 ">
                <Image
                    src={image_url}
                    alt={med_name}
                    fill
                    className="object-contain p-6"
                />
            </div>


            <CardContent className="p-4 sm:p-5 space-y-3">
                {/* Top Row */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                        {manufacturer}
                    </span>


                    {/* <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
                        <Star className="text-yellow-400" />
                        {rating}
                    </div> */}
                </div>


                {/* Title */}
                <div>
                    <h3 className="text-lg font-semibold leading-tight">{med_name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{manufacturer}</p>
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