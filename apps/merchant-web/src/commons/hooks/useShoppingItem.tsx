import { useEffect, useState } from "react";
import Product from "../entities/concretes/Product";
import ProductVariantPopUp from "../entities/ProductVariantPopUp";

interface Props {
  currentProduct: Product;
}

export const useShoppingItem = ({ currentProduct }: Props) => {
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [variants, setVariants] = useState<Array<ProductVariantPopUp>>([]);
  const [price, setPrice] = useState(0)

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
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  useEffect(() => {
    setProduct(currentProduct);
  }, [currentProduct]);

  useEffect(() => {
    setPrice(product?.price ?? 0)
  }, [product]);

  useEffect(() => {
    const newPrice = (product?.price ?? 1) * quantity
    setPrice(parseFloat(newPrice.toFixed(2)))
  }, [quantity])

  return {product, variants, getVariants, quantity, handleQuantity, price, increaseQuantity, decreaseQuantity};
};
