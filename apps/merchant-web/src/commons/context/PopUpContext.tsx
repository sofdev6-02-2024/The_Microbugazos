import { createContext, ReactNode, useContext, useState } from "react";
import Product from "../entities/concretes/Product";

interface Type {
  showProductPopUp: boolean;
  product: Product | null;
  openProductPopUp: (product: Product) => void;
  closeProductPopUp: () => void;
}

const ProductPopUpContext = createContext<Type | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const ProductPopUpProvider = ({ children }: Props) => {
  const [showProductPopUp, setShowProductPopUp] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const openProductPopUp = (product: Product) => {
    setShowProductPopUp(true);
    setProduct(product);
  };
  const closeProductPopUp = () => setShowProductPopUp(false);

  return (
    <ProductPopUpContext.Provider value={{ showProductPopUp, product, openProductPopUp, closeProductPopUp }}>
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