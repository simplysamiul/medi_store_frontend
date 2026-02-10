"use client";

import { getAllOrder, updateOrder } from "@/actions/order.action";
import { useEffect, useState } from "react";
import OrdersListTable from "./OrdersListTable";
import { toast } from "react-toastify";


const OrderedList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMedicines = async () => {
        try {
            const res = await getAllOrder();
            if (res?.data?.success) {
                setOrders(res.data.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchMedicines();
    }, []);

    if (loading) {
        return (
            <div className="p-6 text-center text-sm text-muted-foreground">
                Loading Orders lsit...
            </div>
        );
    };


    const handleStatusChange = async (orderId: string, status: string) => {
        const res = await updateOrder(orderId, status)
        

        if(res.data.success){
            fetchMedicines();
            toast.success("Status updated ..!")
        }else{
            toast.error("status updated failed ..!")
        }
    };
    return (
        <div>
            <h2 className="font-bold text-2xl my-2 mx-2">Order List</h2>
            <OrdersListTable orders={orders} onStatusChange={handleStatusChange} />
        </div>
    );
};

export default OrderedList;