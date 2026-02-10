import { OrderItem } from "@/components/orderManage/CartComponent";
import { cookies } from "next/headers";


const API_URL = process.env.NEXT_PUBLIC_API;

export const orderService = {
    createOrder: async function (order: OrderItem) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(order),
            });
            const data = await res.json();
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    getAllOrder: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/orders`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });
            const data = await res.json();
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    updateOrder: async function (orderId:string, orderStatus: string) {
        try {
            console.log(orderStatus)
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({status:orderStatus}),
            });
            const data = await res.json();
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },


}