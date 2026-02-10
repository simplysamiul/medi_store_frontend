"use server";

import { OrderItem } from "@/components/orderManage/CartComponent";
import { orderService } from "@/services/order.service";

export const createOrder = async (order:OrderItem)=> {
    return await orderService.createOrder(order)
};

export const getAllOrder = async ()=> {
    return await orderService.getAllOrder()
}
export const updateOrder = async (orderId:string, orderStatus:string)=> {
    return await orderService.updateOrder(orderId, orderStatus)
};
