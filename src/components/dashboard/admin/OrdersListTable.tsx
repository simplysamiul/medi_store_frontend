"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Order = {
    id: string;
    customer_id: string;
    total_amount: string;
    payment_method: string;
    status: string;
    shipping_address: {
        name: string;
        phone: string;
        address: string;
    };
};

const statusColorMap: Record<string, string> = {
    placed: "bg-blue-100 text-blue-700",
    processing: "bg-yellow-100 text-yellow-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};

export default function OrdersListTable({
    orders,
    onStatusChange,
}: {
    orders: Order[];
    onStatusChange: (orderId: string, status: string) => void;
}) {
    return (
        <div className="rounded-xl border bg-white shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">
                                {order.shipping_address.name}
                            </TableCell>

                            <TableCell>{order.shipping_address.phone}</TableCell>

                            <TableCell className="max-w-xs truncate">
                                {order.shipping_address.address}
                            </TableCell>

                            <TableCell>{order.payment_method}</TableCell>

                            <TableCell className="font-semibold">
                                ${order.total_amount}
                            </TableCell>

                            <TableCell>
                                <Select
                                    value={order.status}
                                    onValueChange={(value) =>
                                        onStatusChange(order.id, value)
                                    }
                                >
                                    <SelectTrigger
                                        className={`w-[140px] capitalize ${statusColorMap[order.status]}`}
                                    >
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="placed">Placed</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="shipped">Shipped</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
