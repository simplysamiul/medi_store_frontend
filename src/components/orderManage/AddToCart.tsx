"use client";

import { useCart } from "@/context/cart.context";

const AddToCartButton = ({ product }: { product: any }) => {
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
