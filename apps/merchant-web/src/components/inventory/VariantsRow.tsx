import Product from "@/commons/entities/concretes/Product";
import style from "@/styles/inventory/inventory-variant-row.module.css";

interface VariantSubSectionProps {
  product: Product;
  active: boolean;
}

const VariantSubSection = ({ product, active }: VariantSubSectionProps) => {
  return (
    <>
      <tr
        className={`${style["inventory-variant-row"]} ${
          style["inventory-variant-row-header"]
        } ${!active && style.hiddenVariant}`}
      >
        <td></td>
        <td>Image</td>
        <td>Attibutes</td>
        <td>Quantity</td>
      </tr>
      {product.productVariants.map((variant, index) => (
        <tr
          key={variant.productVariantId}
          className={`${style["inventory-variant-row"]} ${
            !active && style.hiddenVariant
          }`}
        >
          <td></td>
          <td>
            <img
              className="image-inventory-row"
              src={variant.productVariantImage.url}
              alt={variant.productVariantImage.altText}
            />
          </td>
          <td>
            {variant.attributes.map((attribute, index) => (
              <p key={index}>
                {attribute.name}: {attribute.value}
              </p>
            ))}
          </td>
          <td>
            <p>{variant.stockQuantity}</p>
          </td>
        </tr>
      ))}
    </>
  );
};

export default VariantSubSection;
