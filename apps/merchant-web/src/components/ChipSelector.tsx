import { useShoppingItem } from "@/commons/context/ShoppingItemContext";
import ChipSelectorStyle from "@/styles/general/ChipSelector.module.css";

interface ChipSelectorProps {
  name: string;
  options: string[];
  handleChange: (value: string) => void;
}

export default function ChipSelector({
  name,
  options,
  handleChange,
}: Readonly<ChipSelectorProps>) {
  const { selectedAttributes } = useShoppingItem();

  const isSelected = (item: string) => {
    return selectedAttributes.some(
      (attribute) => attribute.name === name && attribute.value === item
    );
  };

  return (
    <div className={ChipSelectorStyle.container}>
      {options.map((item, index) => (
        <button
          key={`option-variant-${index}-${name}-${item}`}
          className={`${ChipSelectorStyle.chip} ${
            isSelected(item) ? ChipSelectorStyle.selected : ""
          }`}
          onClick={() => {
            handleChange(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
