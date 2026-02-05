import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { medicineService } from "@/services/medicine.service";
import { categoryService } from "@/services/category.service";
import { MdVerified } from "react-icons/md";
import { IoShieldCheckmarkSharp } from "react-icons/io5";


export default async function MedicineDetails({ medicineId }: { medicineId: string }) {
    const { data } = await medicineService.getMedicineById(medicineId);
    const { image_url, med_name, stock_quantity, med_des, manufacturer, expiry_date, category_id } = data.data;
    const { data: category } = await categoryService.getMedicines(category_id);
    const { category_name, descripting } = category.data;

    const inStock = Number(stock_quantity) > 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 space-y-8">
            {/* ================= TOP GRID ================= */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* LEFT — IMAGE + INFO */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image */}
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

                        {/* Core Info */}
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

                            <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
                                {med_name}
                            </h1>

                            <p className="text-gray-600 leading-relaxed">
                                {med_des}
                            </p>

                            {/* Meta Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
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


                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 pt-5">
                                {/* Authentic */}
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 flex items-center justify-center">
                                        <MdVerified className="text-blue-600 text-2xl" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-600">
                                        AUTHENTIC
                                    </span>
                                </div>

                                {/* FDA Approved */}
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 flex items-center justify-center">
                                        <IoShieldCheckmarkSharp className="text-blue-600 text-2xl" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-600">
                                        FDA APPROVED
                                    </span>
                                </div>

                                {/* Verified */}
                                <div className="flex flex-col items-center text-center gap-2">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-7 h-7 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h10l1 4v12l-6-3-6 3V8l1-4z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-bold text-gray-600">
                                        VERIFIED
                                    </span>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>

                {/* RIGHT — PRICE / ACTION PANEL */}
                <div className="xl:col-span-1">
                    <Card className="rounded-2xl sticky top-6">
                        <CardContent className="p-5 sm:p-6 space-y-5">
                            <div className="space-y-2">
                                <p className="text-lg text-gray-500">Price</p>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <span className="text-2xl text-blue-600 font-bold">
                                        $ 10.00
                                    </span>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-2">
                                <p className="text-sm font-medium">Quantity</p>
                                <div className="flex items-center gap-3">
                                    <Button variant="outline" size="icon">-</Button>
                                    <span className="px-4 py-2 border rounded-md">1</span>
                                    <Button variant="outline" size="icon">+</Button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <Button className="w-full bg-blue-600 hover:bg-blue-800" disabled={!inStock}>
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full hover:border hover:border-blue-600"
                                    disabled={!inStock}
                                >
                                    Buy Now
                                </Button>
                            </div>

                            {/* Trust Notes */}
                            <div className="text-xs text-gray-500 space-y-1 pt-2">
                                <p>• Secure checkout</p>
                                <p>• Verified medicine source</p>
                                <p>• Proper storage guaranteed</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* ================= CATEGORY + DESCRIPTION ================= */}
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
};
