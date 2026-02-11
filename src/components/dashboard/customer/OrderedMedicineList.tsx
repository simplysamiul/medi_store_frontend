"use client";

import { getOrdersByCustomerId } from '@/actions/order.action';
import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { OrderItem } from '@/components/orderManage/CartComponent';
import OrderDetailsDialog from './OrderDetailsDialog';

export type Order = {
    id: string;
    total_amount: string;
    payment_method: string;
    status: string;
    created_at: string;
    shipping_address: {
        name: string;
        phone: string;
        address: string;
    };
    orderItems: OrderItem[];
};

const OrderedMedicineList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const session = authClient.useSession();
    const customerId = session.data?.user.id;


    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const res = await getOrdersByCustomerId(customerId as string);
                if (res?.data?.success) {
                    setOrders(res.data.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, [customerId]);

    const handleCopy = async (id:string) => {
        await navigator.clipboard.writeText(id);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };


    const statusColorMap: Record<string, string> = {
        placed: "bg-blue-100 text-blue-700",
        processing: "bg-yellow-100 text-yellow-700",
        shipped: "bg-purple-100 text-purple-700",
        delivered: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    if (loading) {
        return (
            <div className="p-6 text-center text-sm text-muted-foreground">
                Loading Orders lsit...
            </div>
        );
    };

    return (
        <div className="rounded-xl border bg-white shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orders.map((order: Order) => (
                        <TableRow key={order.id}>
                            <TableCell className="text-xs font-mono">
                                <span
                                    onClick={() => handleCopy(order.id)}
                                    className="text-xs font-mono cursor-pointer hover:text-blue-600 transition"
                                >
                                    {copied ? "Copied!" : `${order.id.slice(0, 8)}...`}
                                </span>
                            </TableCell>

                            <TableCell className="font-medium">
                                {order.shipping_address.name}
                            </TableCell>

                            <TableCell>
                                {order.shipping_address.phone}
                            </TableCell>

                            <TableCell className="max-w-xs truncate">
                                {order.shipping_address.address}
                            </TableCell>

                            <TableCell className="font-semibold">
                                ${order.total_amount}
                            </TableCell>

                            <TableCell>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs capitalize font-medium ${statusColorMap[order.status]}`}
                                >
                                    {order.status}
                                </span>
                            </TableCell>

                            <TableCell>
                                <OrderDetailsDialog order={order} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OrderedMedicineList;