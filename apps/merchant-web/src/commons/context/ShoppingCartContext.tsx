import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import Product from "../entities/concretes/Product";

interface Types {
  products: Array<Product>;
  addProductToCart: (newProduct: Product) => void;
}

interface Props {
  children: ReactNode;
}

const ShoppingCartContext = createContext<Types | undefined>(undefined);

export const ShoppingCartProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Array<Product>>([]);

  const addProductToCart = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };

  const value = useMemo(() => {
    return { products, addProductToCart };
  }, [products]);

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }

  return context;
};
