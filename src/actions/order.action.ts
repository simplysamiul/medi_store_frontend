"use server";

import { orderService } from "@/services/order.service";

export const createOrder = async (order:any)=> {
    return await orderService.createOrder(order)
};

export const getAllOrder = async ()=> {
    return await orderService.getAllOrder()
}

export const getOrdersByCustomerId = async (customerId:string)=> {
    return await orderService.getOrdersByCustomerId(customerId)
}

export const updateOrder = async (orderId:string, orderStatus:string)=> {
    return await orderService.updateOrder(orderId, orderStatus)
};
