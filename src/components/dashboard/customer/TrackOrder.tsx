"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getOrdersByCustomerId } from "@/actions/order.action";
import { authClient } from "@/lib/auth-client";
import { CheckCircle2 } from "lucide-react";

// ================= TYPES =================
interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

interface Order {
  id: string;
  customer_id: string;
  total_amount: string;
  payment_method: string;
  status: "placed" | "processing" | "shipped" | "delivered" | "cancelled";
  created_at: string;
  updated_at: string;
  orderItems: OrderItem[];
}

const ORDER_STEPS: Order["status"][] = [
  "placed",
  "processing",
  "shipped",
  "delivered",
];

export default function TrackOrder() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchId, setSearchId] = useState("");
  const session = authClient.useSession();
  const customerId = session.data?.user.id;

  // ================= FETCH ORDERS =================
  useEffect(() => {
    const fetchOrders = async () => {
      if (!customerId) return;

      try {
        const res = await getOrdersByCustomerId(customerId);
        if (res?.data?.success) {
          setOrders(res.data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, [customerId]);

  // ================= FILTER ORDER =================
  const filteredOrders = useMemo(() => {
    if (!searchId) return orders;
    return orders.filter((order) => order.id.includes(searchId));
  }, [orders, searchId]);

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Track Your Orders</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Enter your Order ID to highlight the current tracking progress
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-md mx-auto">
          <Input
            placeholder="Enter Order ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="h-12 rounded-xl"
          />
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const currentIndex = ORDER_STEPS.indexOf(order.status);
            const isCancelled = order.status === "cancelled";

            return (
              <Card
                key={order.id}
                className="rounded-2xl shadow-md border bg-white"
              >
                <CardContent className="p-6 space-y-6">
                  {/* Order Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-sm text-gray-500">Order ID</p>
                      <p className="font-semibold break-all">{order.id}</p>
                    </div>

                    <Badge
                      className={`capitalize px-4 py-1 text-sm rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </div>

                  {/* Timeline */}
                  <div className="relative">
                    <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded" />

                    <div className="relative flex justify-between">
                      {ORDER_STEPS.map((step, index) => {
                        const isActive = index <= currentIndex;

                        return (
                          <div
                            key={step}
                            className="flex flex-col items-center text-center w-full"
                          >
                            <div
                              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                isCancelled
                                  ? "bg-red-500 border-red-500 text-white"
                                  : isActive
                                  ? "bg-green-500 border-green-500 text-white"
                                  : "bg-white border-gray-300 text-gray-400"
                              }`}
                            >
                              {isActive && !isCancelled ? (
                                <CheckCircle2 className="w-5 h-5" />
                              ) : (
                                <span className="text-sm font-semibold">
                                  {index + 1}
                                </span>
                              )}
                            </div>

                            <p
                              className={`mt-2 text-xs sm:text-sm capitalize font-medium ${
                                isCancelled
                                  ? "text-red-500"
                                  : isActive
                                  ? "text-green-600"
                                  : "text-gray-400"
                              }`}
                            >
                              {step}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <p>Total Amount</p>
                      <p className="font-semibold text-black">
                        ${order.total_amount}
                      </p>
                    </div>
                    <div>
                      <p>Payment Method</p>
                      <p className="font-semibold text-black capitalize">
                        {order.payment_method.replaceAll("_", " ")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
