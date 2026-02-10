"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart.context";
import { toast } from "react-toastify";

export interface Medicine {
    id: string;
    name: string;
    image: string;
    price: number;
    stock: number;
}

const HomeAddToCart = ({ medicine }: { medicine: Medicine }) => {
    const { state, dispatch } = useCart();
    const alreadyInCart = state.items.some(
        (item) => item.id === medicine.id
    );
    /* ================= Add to Cart ================= */
    const addToCart = () => {
        dispatch({
            type: "ADD",
            payload: {
                id: medicine.id,
                name: medicine.name,
                image: medicine.image,
                price: medicine.price,
                quantity: 1,
            },
        });

        toast.success("Medicine added successfully..!")
    };
    return (
        <div>
            <Button
                size="icon"
                className="rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200"
                disabled={alreadyInCart || medicine.stock === 0}
                onClick={addToCart}
            >
                <ShoppingCart />
            </Button>
        </div>
    );
};

export default HomeAddToCart;