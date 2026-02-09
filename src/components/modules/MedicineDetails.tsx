import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { medicineService } from "@/services/medicine.service";
import { categoryService } from "@/services/category.service";
import { MdVerified } from "react-icons/md";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import CartAction from "@/app/(commonLayout)/cart/CartAction";

export default async function MedicineDetails({
    medicineId,
}: {
    medicineId: string;
}) {
    const { data } = await medicineService.getMedicineById(medicineId);
    const {
        image_url,
        med_name,
        stock_quantity,
        med_des,
        manufacturer,
        expiry_date,
        category_id,
        price,
    } = data.data;

    const { data: category } = await categoryService.getCategoryById(category_id);
    const { category_name, descripting } = category.data;

    const inStock = Number(stock_quantity) > 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* LEFT */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="rounded-2xl overflow-hidden">
                            <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[460px] bg-gray-50">
                                <Image
                                    src={image_url}
                                    alt={med_name}
                                    fill
                                    className="object-contain p-6"
                                    priority
                                />
                            </div>
                        </Card>

                        <div className="space-y-5">
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge className="bg-blue-100 text-blue-700">
                                    {category_name}
                                </Badge>

                                <Badge
                                    className={
                                        inStock
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-red-100 text-red-700"
                                    }
                                >
                                    {inStock ? "In Stock" : "Out of Stock"}
                                </Badge>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold">{med_name}</h1>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500">Manufacturer</p>
                                    <p className="font-medium">{manufacturer}</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">Stock</p>
                                    <p className="font-medium">{stock_quantity} units</p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">Expiry</p>
                                    <p className="font-medium">
                                        {new Date(expiry_date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-4 pt-5">
                                <Trust icon={<MdVerified />} label="AUTHENTIC" />
                                <Trust icon={<IoShieldCheckmarkSharp />} label="FDA APPROVED" />
                                <Trust icon={"✓"} label="VERIFIED" />
                            </div>


                        </div>
                    </div>
                </div>

                {/* RIGHT — ACTION PANEL */}
                <div className="xl:col-span-1">
                    <Card className="rounded-2xl sticky top-6">
                        <CardContent className="p-6 space-y-5">
                            <div>
                                <p className="text-lg text-gray-500">Price</p>
                                <span className="text-2xl font-bold text-blue-600">
                                    ${price ?? 10}.00
                                </span>
                            </div>

                            <CartAction
                                medicine={{
                                    id: medicineId,
                                    name: med_name,
                                    image: image_url,
                                    price: Number(price ?? 10),
                                    stock: Number(stock_quantity),
                                }}
                            />
                        </CardContent>
                        {/* Trust Notes */}
                        <div className="text-xs text-gray-500 space-y-1 ml-4">
                            <p>• Secure checkout</p>
                            <p>• Verified medicine source</p>
                            <p>• Proper storage guaranteed</p>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Description */}
                <div className="lg:col-span-2">
                    <Card className="rounded-2xl">
                        <CardContent className="p-5 sm:p-7 space-y-4">
                            <h2 className="text-lg font-semibold">Medicine Description</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {med_des}
                            </p>

                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <p className="text-sm font-semibold text-amber-800">
                                    Safety Notice
                                </p>
                                <p className="text-sm text-amber-700 mt-1">
                                    Take only under medical advice. Do not exceed recommended
                                    dosage. Keep away from children.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Category Section */}
                <div className="lg:col-span-1">
                    <Card className="rounded-2xl h-full">
                        <CardContent className="p-5 sm:p-6 space-y-3">
                            <h3 className="font-semibold text-lg">Generic</h3>
                            <Badge className="bg-blue-100 text-blue-700 w-fit">
                                {category_name}
                            </Badge>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {descripting}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

/* Trust badge helper */
function Trust({ icon, label }:any) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
                {icon}
            </div>
            <span className="text-xs font-bold text-gray-600">{label}</span>
        </div>
    );
}




