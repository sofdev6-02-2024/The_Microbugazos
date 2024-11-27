import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Product from "@/commons/entities/concretes/Product";
import {
  ShoppingItemAttribute,
  ShoppingItemSelectedAttribute,
} from "@/commons/entities/ShoppingItemAttribute";
import { UUID } from "crypto";
import axiosInstance from "@/request/AxiosConfig";
import ShoppingCartItem from "@/commons/entities/ShoppingCartItem";

interface Types {
  product: Product | undefined;
  attributes: Array<ShoppingItemAttribute>;
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
  variantId: UUID | null;
  createProduct: () => ShoppingCartItem | null;
  stock: number;
  priceAdjustment: number;
  selectedAttributes: Array<ShoppingItemSelectedAttribute>;
}
interface Props {
  children: ReactNode;
  currentProduct: Product;
}

const ShoppingItemContext = createContext<Types | undefined>(undefined);

export const ShoppingItemProvider = ({ children, currentProduct }: Props) => {
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [attributes, setAttributes] = useState<Array<ShoppingItemAttribute>>([]);
  const [price, setPrice] = useState(0);
  const [selectedAttributes, setSelectedAttributes] = useState<Array<ShoppingItemSelectedAttribute>>([]);
  const [variantId, setVariantId] = useState<UUID | null>(null);
  const [priceAdjustment, setPriceAdjustment] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");

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
        return new ShoppingItemAttribute(name, values);
      });

      setAttributes(mappedVariants);
    }
  };

  const handleQuantity = (event: { target: { value: string } }) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
      const validQuantity = Math.min(Math.max(newQuantity, 1), stock);
      setQuantity(validQuantity);
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const searchVariantId = () => {
    if (product?.productVariants) {
      let found = false;

      for (const variant of product.productVariants) {
        const matches = variant.attributes.every((attr) =>
          selectedAttributes.some(
            (selectedAttr) =>
              selectedAttr.name === attr.name &&
              selectedAttr.value === attr.value
          )
        );
        if (
          matches &&
          selectedAttributes.length === variant.attributes.length
        ) {
          setVariantId(variant.productVariantId);
          found = true;
          break;
        }
      }
      if (!found) {
        setVariantId(null);
      }
    }
  };

  const chooseAttribute = (name: string, value: string) => {
    setSelectedAttributes((prevAttributes) => {
      const attributeIndex = prevAttributes.findIndex(
        (attribute) => attribute.name === name
      );

      if (attributeIndex !== -1) {
        const updatedAttributes = prevAttributes.map((attribute, index) =>
          index === attributeIndex ? { ...attribute, value } : attribute
        );
        return updatedAttributes;
      } else {
        const newAttributes = [...prevAttributes, { name, value }];
        return newAttributes;
      }
    });
  };

  const handleInfo = async () => {
    if (variantId !== null) {
      const response = await axiosInstance.get(
        `/inventory/ProductVariant/${variantId}`
      );
      setPriceAdjustment(response.data.data.priceAdjustment);
      setStock(response.data.data.stockQuantity);
      setImage(response.data.data.productVariantImage.url);
    } else {
      setPriceAdjustment(0);
      setStock(0);
      if (product) {
        setImage(product.images[0].url);
      }
    }
  };

  const createProduct = (): ShoppingCartItem | null => {
    const quantityAux = quantity;
    setQuantity(1);
    if (product && variantId) {
      const shoppingItem = new ShoppingCartItem(
        product.productId,
        image,
        product.name,
        quantityAux,
        product.price + priceAdjustment,
        price,
        selectedAttributes,
        variantId,
        product.productId
      );
      return shoppingItem;
    } else {
      return null;
    }
  };

  const changeNewPrice = () => {
    const newPrice = ((product?.price ?? 1) + priceAdjustment) * quantity;
    setPrice(parseFloat(newPrice.toFixed(2)));
  }

  useEffect(() => {
    setProduct(currentProduct);
  }, [currentProduct]);

  useEffect(() => {
    setPrice(product?.price ?? 0);
  }, [product]);

  useEffect(() => {
    changeNewPrice();
  }, [priceAdjustment, quantity]);

  useEffect(() => {
    searchVariantId();
  }, [selectedAttributes]);

  useEffect(() => {
    handleInfo();
  }, [variantId, attributes]);

  const value = useMemo(() => {
    return {
      product,
      attributes,
      getVariants,
      quantity,
      handleQuantity,
      price,
      increaseQuantity,
      decreaseQuantity,
      chooseAttribute,
      variantId,
      createProduct,
      stock,
      priceAdjustment,
      selectedAttributes
    };
  }, [product, attributes, price, quantity, stock]);

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
