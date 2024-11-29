import { Select } from "./Select";
import { useShoppingItem } from "@/contexts/ShoppingItemContext";
import "@/styles/general/ProductAttributeSelect.css";

interface Props {
  name: string;
  values: Array<string>;
}

export const ProductAttributeSelect = ({ name, values }: Props) => {
  const { chooseAttribute } = useShoppingItem();

  return (
    <div className="product-attribute-section">
      <h3 className="product-attribute-name">{name}</h3>
      <Select
        values={values}
        handleOption={(value: string) => {
          chooseAttribute(name, value);
        }}
      />
    </div>
  );
};
