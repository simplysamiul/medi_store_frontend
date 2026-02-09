"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart.context";

interface Props {
  medicine: {
    id: string;
    name: string;
    image: string;
    price: number;
    stock: number;
  };
}

export default function CartAction({ medicine }: Props) {
  const router = useRouter();
  const { state, dispatch } = useCart();

  const [qty, setQty] = useState(1);

  const alreadyInCart = state.items.some(
    (item) => item.id === medicine.id
  );

  /* ================= Quantity ================= */
  const increase = () => {
    if (qty < medicine.stock) setQty(qty + 1);
  };

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  /* ================= Add to Cart ================= */
  const addToCart = () => {
    dispatch({
      type: "ADD",
      payload: {
        id: medicine.id,
        name: medicine.name,
        image: medicine.image,
        price: medicine.price,
        quantity: qty,
      },
    });
  };

  /* ================= Buy Now ================= */
  const buyNow = () => {
    if (!alreadyInCart) addToCart();
    router.push("/cart");
  };

  return (
    <>
      {/* Quantity */}
      <div className="space-y-2">
        <p className="text-sm font-medium">Quantity</p>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={decrease}>
            -
          </Button>

          <span className="px-4 py-2 border rounded-md">{qty}</span>

          <Button
            variant="outline"
            size="icon"
            onClick={increase}
            disabled={qty >= medicine.stock}
          >
            +
          </Button>
        </div>

        <p className="text-xs text-gray-500">
          Available stock: {medicine.stock}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-800"
          disabled={alreadyInCart || medicine.stock === 0}
          onClick={addToCart}
        >
          {alreadyInCart ? "Already in Cart" : "Add to Cart"}
        </Button>

        <Button
          variant="outline"
          className="w-full hover:border hover:border-blue-600"
          disabled={medicine.stock === 0}
          onClick={buyNow}
        >
          Buy Now
        </Button>
      </div>
    </>
  );
}
