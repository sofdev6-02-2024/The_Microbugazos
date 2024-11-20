import "@/styles/general/product-pop-up/product-pop-up-header.css"

interface Props {
  name: string;
  brand: string;
}

export const ProductPopUpHeader = ({ name, brand }: Props) => {
  return (
    <div className="product-popup-header">
      <h2 className="product-popup-name">{name} Variants</h2>
      <p className="product-popup-brand">{brand}</p>
    </div>
  );
};
