"use client";

import { useCart } from "@/context/cart.context";
import { MedicineType } from "@/types";

const AddToCartButton = ({ product }: { product: MedicineType }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({
      type: "ADD",
      payload: product,
    });
  };

  return <button onClick={addToCart}>Add to Cart</button>;
};

export default AddToCartButton;
