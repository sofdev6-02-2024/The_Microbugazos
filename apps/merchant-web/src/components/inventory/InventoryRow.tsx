import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEllipsisV, FaRegTrashAlt } from "react-icons/fa";
import { SquarePen, User } from "lucide-react";
import { MdOutlineStar } from "react-icons/md";
import { defaultSmallImage } from "@/schemes/store/StoreFormDto";
import { deleteProductById } from "@/request/ProductRequests";
import { Button } from "../atoms/buttons/Button";
import { InventoryRowOptions } from "./InventoryRowOptions";
import Product from "@/commons/entities/concretes/Product";
import "@/styles/inventory/inventory-table-rows.css";
import "@/styles/inventory/product-row-inventory.css";
import VariantSubSection from "./VariantsRow";
import { useStore } from "@/commons/context/StoreContext";
import { useAuth } from "@/commons/context/AuthContext";
import { UserType } from "@/types/auth";

interface InventoryRowProps {
  product: Product;
  reloadPage: () => Promise<void>;
  deleteProduct: (deleteProduct: () => Promise<void>) => void;
  setCurrentProduct: (product: Product) => void;
  openConfigurationSettings: () => void;
  active: boolean;
  onClick: () => void;
}

export const InventoryRow = ({
  product,
  reloadPage,
  deleteProduct,
  setCurrentProduct,
  openConfigurationSettings,
  active,
  onClick,
}: InventoryRowProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const { store } = useStore();

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
  };

  const getLowStockThreshold = () => {
    let threshold = store?.lowStockThreshold;
    if (product && product.lowStockThreshold && product.lowStockThreshold > 0) {
      threshold = product.lowStockThreshold;
    }
    if (!threshold) {
      return 0;
    }
    return threshold;
  };
  const isStockLessTheThreshold = () => {
    const threshold = getLowStockThreshold();
    for (const variant of product.productVariants) {
      if (variant.stockQuantity < threshold) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      <tr className={`admin-store-inventory-row inventory-product-row`}>
        <td className="inventory-product-name-ctn">
          <img
            className="image-inventory-row"
            src={
              product.images.length > 0
                ? product.images[0].url
                : defaultSmallImage
            }
            alt={
              product.images.length > 0 ? product.images[0].url : product.name
            }
          />
          <p className={"inventory-product-name"} onClick={onClick}>
            {product.name}
          </p>
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

          {user?.userType === UserType.OWNER && (
            <Button
              variant="button-variant-small"
              shape="squared"
              buttonStyle="button-delete"
              handleClick={handleOpenPoppupToDeleteProduct}
              className="hiddable-button"
            >
              <FaRegTrashAlt />
            </Button>
          )}
          <Button
            variant="button-variant-small"
            buttonStyle="button-free"
            handleClick={() => setIsVisible(!isVisible)}
            className={
              user?.userType === UserType.OWNER ? "" : "hiddable-button-reverse"
            }
          >
            <FaEllipsisV />
            <InventoryRowOptions
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              onRemove={handleOpenPoppupToDeleteProduct}
              onEdit={handleUpdateProduct}
              onConfiguringSettings={handleOpenConfigurationSettings}
              isOwnerOption={user?.userType === UserType.OWNER}
            />
          </Button>
        </td>
        {isStockLessTheThreshold() && (
          <td className="inventory-low-stock-message">Low Stock</td>
        )}
      </tr>

      <VariantSubSection
        product={product}
        active={active}
        threshold={getLowStockThreshold()}
      />
    </>
  );
};
