import { createContext, ReactNode, useContext, useState } from "react";
import Product from "@/commons/entities/concretes/Product";

interface Type {
  showProductPopUp: boolean;
  product: Product | null;
  openProductPopUp: (product: Product) => void;
  closeProductPopUp: () => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
}

const ProductPopUpContext = createContext<Type | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const ProductPopUpProvider = ({ children }: Props) => {
  const [showProductPopUp, setShowProductPopUp] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const openProductPopUp = (product: Product) => {
    setShowProductPopUp(true);
    setProduct(product);
    setQuantity(1);
  };
  const closeProductPopUp = () => setShowProductPopUp(false);

  const increaseQuantity = () => setQuantity(quantity + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ProductPopUpContext.Provider value={{ showProductPopUp, product, openProductPopUp, closeProductPopUp, quantity, setQuantity, increaseQuantity, decreaseQuantity }}>
      {children}
    </ProductPopUpContext.Provider>
  );
}

export const useProductPopUp = () => {
  const context = useContext(ProductPopUpContext);

  if (!context) {
    throw new Error("useProductPopUp must be used within a ProductPopUpProvider");
  }

  return context;
}
