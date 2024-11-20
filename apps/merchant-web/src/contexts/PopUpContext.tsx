import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import Product from "@/commons/entities/concretes/Product";
import ProductVariantPopUp from "@/commons/entities/ProductVariantPopUp";

interface Type {
  showProductPopUp: boolean;
  product: Product | null;
  openProductPopUp: (product: Product) => void;
  closeProductPopUp: () => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  getVariants: () => void;
  variants: ProductVariantPopUp[] | null;
  handleQuantity: (event: { target: { value: string } }) => void;
}

const ProductPopUpContext = createContext<Type | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const ProductPopUpProvider = ({ children }: Props) => {
  const [variants, setVariants] = useState<ProductVariantPopUp[] | null>(null);
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

  const getVariants = () => {
    if (product?.productVariants) {
      const attributeMap: Record<string, Set<string>> = {};

      product.productVariants.forEach((variant) => {
        variant.attributes.forEach((attr) => {
          if (!attributeMap[attr.name]) {
            attributeMap[attr.name] = new Set();
          }
          attributeMap[attr.name].add(attr.value);
        });
      });

      const mappedVariants = Object.keys(attributeMap).map((name) => {
        const values = Array.from(attributeMap[name]);
        return new ProductVariantPopUp(name, values);
      });

      setVariants(mappedVariants);
    }
  };

  const handleQuantity = (event: { target: { value: string } }) => {
    setQuantity(Number(event.target.value));
  };

  const value = useMemo(
    () => ({
      showProductPopUp,
      product,
      openProductPopUp,
      closeProductPopUp,
      quantity,
      setQuantity,
      increaseQuantity,
      decreaseQuantity,
      getVariants,
      variants,
      handleQuantity,
    }),
    [showProductPopUp, product, quantity, variants]
  );

  return (
    <ProductPopUpContext.Provider value={value}>
      {children}
    </ProductPopUpContext.Provider>
  );
};

export const useProductPopUp = () => {
  const context = useContext(ProductPopUpContext);

  if (!context) {
    throw new Error(
      "useProductPopUp must be used within a ProductPopUpProvider"
    );
  }

  return context;
};
