import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Order } from "./OrderedMedicineList";


export default function OrderDetailsDialog({ order }: { order: Order }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                    Details
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>

                {/* Order Info */}
                <div className="space-y-3 text-sm">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Payment:</strong> {order.payment_method}</p>
                    <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
                    <p><strong>Total:</strong> ${order.total_amount}</p>

                    <div>
                        <strong>Shipping Info:</strong>
                        <p>{order.shipping_address.name}</p>
                        <p>{order.shipping_address.phone}</p>
                        <p>{order.shipping_address.address}</p>
                    </div>
                </div>

                {/* Ordered Items */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-3">Ordered Items</h3>

                    <div className="space-y-4">
                        {order.orderItems.map((item: any) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 border rounded-lg p-3"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                    className="w-10 h-10 object-contain"
                                />

                                <div className="flex-1">
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        ${item.price} × {item.quantity}
                                    </p>
                                </div>

                                <p className="font-semibold">
                                    ${Number(item.price) * item.quantity}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
