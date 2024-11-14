import { useProductPopUp } from "@/commons/context/PopUpContext";
import "@/styles/general/ProductPopUp.css";
import { MdClose } from "react-icons/md";

export const ProductPopUp = () => {
  const { showProductPopUp, product, closeProductPopUp } = useProductPopUp();

  if (!showProductPopUp && product) {
    return null;
  }

  return (
    <div className={`product-popup ${showProductPopUp ? "show" : ""}`}>
      <button
        onClick={closeProductPopUp}
        className="product-popup-close-button"
      >
        <MdClose />
      </button>
      <h2 className="product-popup-name">
        {product?.name} variants
      </h2>
      <div className="product-popup-variants-section">
          {product && product.productVariants.length > 0 ? (
            product.productVariants.map((variant, index) => (
              <div key={index} className="product-popup-variant">
                <p>{`${String(product.price + variant.priceAdjustment)}`} $</p>
                <p>{variant.stockQuantity} ID</p>
              </div>
            ))
          ) : (
            <p>No variants available</p>
          )}
        </div>
    </div>
  );
};
