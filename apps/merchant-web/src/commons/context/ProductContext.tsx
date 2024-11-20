import {
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import ShoppingCartItem from "../entities/ShoppingCartItem";
import { UUID } from "crypto";

export const ProductsContext = createContext<Map<UUID, ShoppingCartItem> | undefined>(
  undefined
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Map<UUID, ShoppingCartItem>>((): Map<UUID, ShoppingCartItem> => {
    const savedCart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    return new Map(Object.entries(savedCart).map(([key, value]) => [key as UUID, value as ShoppingCartItem]));
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  const handleAddToCart = (newProduct: ShoppingCartItem) => {
    const existingProduct = products.get(newProduct.id);
    if (existingProduct) {
      setProducts(
        new Map(products.entries()).set(existingProduct.id, {
         ...existingProduct,
          quantity: existingProduct.quantity + 1,
        })
      );
    } else {
      setProducts(products.set(newProduct.id, newProduct));
    }
  }
};
