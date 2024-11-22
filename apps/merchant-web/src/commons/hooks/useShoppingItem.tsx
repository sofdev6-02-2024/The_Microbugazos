import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Product from "../entities/concretes/Product";
import ProductVariantPopUp from "../entities/ProductVariantPopUp";
import ShoppingItemAttribute from "../entities/ShoppingItemAttribute";

interface Types {
  product: Product | undefined;
  variants: Array<ProductVariantPopUp>;
  getVariants: () => void;
  quantity: number;
  handleQuantity: (event: {
    target: {
      value: string;
    };
  }) => void;
  price: number;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  chooseAttribute: (name: string, value: string) => void;
}
interface Props {
  children: ReactNode;
  currentProduct: Product;
}

const ShoppingItemContext = createContext<Types | undefined>(undefined);

export const ShoppingItemProvider = ({ children, currentProduct }: Props) => {
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [variants, setVariants] = useState<Array<ProductVariantPopUp>>([]);
  const [price, setPrice] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Array<ShoppingItemAttribute>
  >([]);

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
    if (parseInt(event.target.value)) {
      const newQuantity = parseInt(event.target.value);
      setQuantity(newQuantity);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const chooseAttribute = (name: string, value: string) => {
    console.log("Updating attribute:", name, "with value:", value);

    setSelectedAttributes((prevAttributes) => {
      console.log("Previous attributes:", prevAttributes);

      const attributeIndex = prevAttributes.findIndex(
        (attribute) => attribute.name === name
      );

      if (attributeIndex !== -1) {
        const updatedAttributes = prevAttributes.map((attribute, index) =>
          index === attributeIndex ? { ...attribute, value } : attribute
        );
        console.log("Updated attributes:", updatedAttributes);
        return updatedAttributes;
      } else {
        const newAttributes = [...prevAttributes, { name, value }];
        console.log("New attributes:", newAttributes);
        return newAttributes;
      }
    });
  };

  useEffect(() => {
    setProduct(currentProduct);
  }, [currentProduct]);

  useEffect(() => {
    setPrice(product?.price ?? 0);
  }, [product]);

  useEffect(() => {
    const newPrice = (product?.price ?? 1) * quantity;
    setPrice(parseFloat(newPrice.toFixed(2)));
  }, [quantity]);

  useEffect(() => {
    console.clear();
    console.log(selectedAttributes);
  }, [selectedAttributes]);

  const value = useMemo(() => {
    return {
      product,
      variants,
      getVariants,
      quantity,
      handleQuantity,
      price,
      increaseQuantity,
      decreaseQuantity,
      chooseAttribute,
    };
  }, [product, variants, price, quantity]);

  return (
    <ShoppingItemContext.Provider value={value}>
      {children}
    </ShoppingItemContext.Provider>
  );
};

export const useShoppingItem = (): Types => {
  const context = useContext(ShoppingItemContext);

  if (!context) {
    throw new Error(
      "useShoppingItem must be used within a ShoppingItemProvider"
    );
  }

  return context;
};
