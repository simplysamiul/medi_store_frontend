"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";

/* ================= TYPES ================= */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: string }
  | { type: "INCREASE"; payload: string }
  | { type: "DECREASE"; payload: string }
  | { type: "CLEAR" };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

/* ================= CONTEXT ================= */
const CartContext = createContext<CartContextType | undefined>(undefined);

/* ================= REDUCER ================= */
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "INCREASE":
      return {
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE":
      return {
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "REMOVE":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
};

/* ================= PROVIDER ================= */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

/* ================= HOOK ================= */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
