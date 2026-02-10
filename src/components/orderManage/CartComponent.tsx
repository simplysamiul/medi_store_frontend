"use client";

import { useCart } from "@/context/cart.context";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "react-toastify";
import { createOrder } from "@/actions/order.action";
import { authClient } from "@/lib/auth-client";

export interface OrderItem {
  customer_id: string;
  orderItems: [];
  shipping_address: string ;
  total_amount: string | number;
}

const CartComponent = () => {
  const { state, dispatch } = useCart();

  /* ================= SHIPPING STATE ================= */
  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
  });

  /* ================= TOTAL PRICE ================= */
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= CONFIRM ORDER ================= */
  const session = authClient.useSession();
  const customer_id = session.data?.user.id;
  const handleConfirmOrder = async () => {
    if (!shipping.name || !shipping.phone || !shipping.address) {
      toast.error("Please fill all shipping details");
      return;
    }

    if (!state.items.length) {
      toast.error("Your cart is empty");
      return;
    }

    const orderPayload = {
      customer_id,
      orderItems: state.items,
      shipping_address:shipping,
      total_amount:totalPrice,
    };

    const res = await createOrder(orderPayload);
    console.log("response", res)
    console.log("ORDER DATA 👉", orderPayload);

    toast.success("Order confirmed!");

    dispatch({ type: "CLEAR" });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold">Cart</h1>

      {/* ================= CART LIST ================= */}
      <Card className="border border-blue-300">
        <CardHeader>
          <CardTitle>Added to Cart</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {state.items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Your cart is empty
            </p>
          ) : (
            state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                {item.image && (
                  <div className="relative w-16 h-16 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm opacity-70">
                    ৳ {item.price} × {item.quantity}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      dispatch({ type: "DECREASE", payload: item.id })
                    }
                  >
                    -
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      dispatch({ type: "INCREASE", payload: item.id })
                    }
                  >
                    +
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() =>
                      dispatch({ type: "REMOVE", payload: item.id })
                    }
                  >
                    ✕
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* ================= SHIPPING ADDRESS ================= */}
      <Card className="border border-blue-300">
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              value={shipping.name}
              onChange={(e) =>
                setShipping({ ...shipping, name: e.target.value })
              }
              placeholder="Full name"
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              value={shipping.phone}
              onChange={(e) =>
                setShipping({ ...shipping, phone: e.target.value })
              }
              placeholder="Phone number"
            />
          </div>

          <div>
            <Label>Address</Label>
            <Input
              value={shipping.address}
              onChange={(e) =>
                setShipping({ ...shipping, address: e.target.value })
              }
              placeholder="Full delivery address"
            />
          </div>
        </CardContent>
      </Card>

      {/* ================= ORDER SUMMARY ================= */}
      <Card className="border border-blue-300">
        <CardContent className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-70">Total Price</p>
            <p className="text-xl font-bold">৳ {totalPrice}</p>
          </div>

          <Button
            size="lg"
            onClick={handleConfirmOrder}
            disabled={!state.items.length}
          >
            Confirm Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartComponent;
