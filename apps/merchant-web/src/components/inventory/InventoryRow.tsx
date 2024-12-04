import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEllipsisV, FaRegTrashAlt} from "react-icons/fa";
import { SquarePen } from "lucide-react";
import { MdOutlineStar } from "react-icons/md";
import { defaultSmallImage } from "@/schemes/store/StoreFormDto";
import { deleteProductById } from "@/request/ProductRequests";
import { Button } from "../atoms/buttons/Button";
import { InventoryRowOptions } from "./InventoryRowOptions";
import Product from "@/commons/entities/concretes/Product";
import "@/styles/inventory/inventory-table-rows.css";
import "@/styles/inventory/product-row-inventory.css";

interface InventoryRowProps {
  product: Product;
  reloadPage: () => Promise<void>;
  deleteProduct: (deleteProduct: () => Promise<void>) => void;
  setCurrentProduct: (product: Product) => void;
  openConfigurationSettings: () => void;
}

export const InventoryRow = ({
  product,
  reloadPage,
  deleteProduct,
  setCurrentProduct,
  openConfigurationSettings,
}: InventoryRowProps) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const formatToK = (number: number) => {
    if (number < 1000) {
      return number.toString();
    }
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  };

  const handleDeleteProduct = async () => {
    await deleteProductById(product.id);
    await reloadPage();
  };

  const handleOpenPoppupToDeleteProduct = () => {
    setCurrentProduct(product);
    deleteProduct(handleDeleteProduct);
  };

  const handleOpenConfigurationSettings = () => {
    setCurrentProduct(product);
    openConfigurationSettings();
  };

  const handleUpdateProduct = () => {
    router.push(`/store/add-product/${product.id}`);
  }
  return (
    <tr className="admin-store-inventory-row inventory-product-row">
      <td className="inventory-product-name-ctn">
        <img
          className="image-inventory-row"
          src={
            product.images.length > 0
              ? product.images[0].url
              : defaultSmallImage
          }
          alt={product.images.length > 0 ? product.images[0].url : product.name}
        />
        <p>{product.name}</p>
      </td>
      <td>
        <p>{formatToK(product.price)} $</p>
      </td>
      <td className="inventory-product-reviews-ctn">
        <MdOutlineStar />
        {product.productReviews ? product.productReviews.length : 0}
      </td>
      <td className="inventory-product-buttons-ctn">
        <Button
          variant="button-variant-small"
          shape="squared"
          buttonStyle="button-filled"
          handleClick={handleUpdateProduct}
          className="hiddable-button"
        >
          <SquarePen />
        </Button>
        <Button
          variant="button-variant-small"
          shape="squared"
          buttonStyle="button-delete"
          handleClick={handleOpenPoppupToDeleteProduct}
          className="hiddable-button"
        >
          <FaRegTrashAlt />
        </Button>
        <Button
          variant="button-variant-small"
          buttonStyle="button-free"
          handleClick={() => setIsVisible(!isVisible)}
        >
          <FaEllipsisV />
          <InventoryRowOptions
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onRemove={handleOpenPoppupToDeleteProduct}
            onEdit={handleUpdateProduct}
            onConfiguringSettings={handleOpenConfigurationSettings}
          />
        </Button>
      </td>
    </tr>
  );
};
