import Product from "@/commons/entities/concretes/Product";
import "@/styles/inventory/inventory-table-rows.css";
import "@/styles/inventory/product-row-inventory.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "../atoms/buttons/Button";
import { FaEllipsisV } from "react-icons/fa";
import { defaultSmallImage } from "@/schemes/store/StoreFormDto";
import { deleteProductById } from "@/request/ProductRequests";
import { useState } from "react";
import { InventoryRowOptions } from "./InventoryRowOptions";

interface InventoryRowProps {
  product: Product;
  reloadPage: () => Promise<void>;
}

export const InventoryRow = ({ product, reloadPage }: InventoryRowProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const formatToK = (number: number) => {
    if (number < 1000) {
      return number.toString();
    }
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  };

  const getTotalAmount = () => {
    return product.productVariants.reduce(
      (total, variant) => total + variant.stockQuantity,
      0
    );
  };

  const handleDeleteProduct = async () => {
    await deleteProductById(product.id);
    await reloadPage();
  };

  return (
    <tr className="admin-store-inventory-row inventory-product-row">
      <td className="inventory-product-name-ctn">
        <img
          className="image-inventory-row"
          src={product.images.length > 0 ? product.images[0].url : defaultSmallImage}
          alt={product.images.length > 0 ? product.images[0].url : product.name}
        />
        <p>{product.name}</p>
      </td>
      <td>
        <p>{formatToK(product.price)} $</p>
      </td>
      <td>{formatToK(getTotalAmount())}</td>
      <td className="inventory-product-buttons-ctn">
        <Button
          variant="button-variant-small"
          buttonStyle="button-delete"
          handleClick={handleDeleteProduct}
        >
          <FaRegTrashAlt />
        </Button>
      </td>

      <td className="inventory-product-buttons-ctn-mobile">
        <Button
          variant="button-variant-small"
          buttonStyle="button-free"
          handleClick={() => setIsVisible(!isVisible)}
        >
          <FaEllipsisV />
          <InventoryRowOptions
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onRemove={handleDeleteProduct}
          />
        </Button>
      </td>
    </tr>
  );
};
