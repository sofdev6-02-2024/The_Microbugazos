import { QuantityPicker } from "@/components/QuantityPicker";
import { AddToCart } from "../AddToCart";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";
import { useProductPopUp } from "@/contexts/PopUpContext";
import "@/styles/general/product-pop-up/product-pop-up-footer.css"

export const ProductPopUpFooter = () => {
  const {
    product,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    handleQuantity,
  } = useProductPopUp();

  return (
    <div className="product-popup-footer">
      <div className="product-popup-footer-info">
        <p className="total-price">
          Total: {quantity * (product?.price ?? 0)} $
        </p>
        <QuantityPicker
          quantity={quantity}
          changeQuantity={handleQuantity}
          increase={increaseQuantity}
          decrease={decreaseQuantity}
        />
      </div>
      <div className="product-popup-footer-actions">
        {product && (
          <AddToCart
            product={product}
            action={() => {
              console.log(product);
            }}
          />
        )}
        <Link className="view-product-button" href={`/product/${product?.id}`}>
          View product
          <MdOpenInNew />
        </Link>
      </div>
    </div>
  );
};
