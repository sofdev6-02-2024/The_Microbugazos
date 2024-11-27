"use client";

import { useShoppingItem } from "@/contexts/ShoppingItemContext";
import styles from "@/styles/general/ChipSelector.module.css";

interface Props {
  name: string;
  options: string[];
  handleChange: (value: string) => void;
}

export const AttributeSelector = ({
  name,
  options,
  handleChange,
}: Readonly<Props>) => {
  const { selectedAttributes } = useShoppingItem();

  const isSelected = (item: string) => {
    return selectedAttributes.some(
      (attribute) => attribute.name === name && attribute.value === item
    );
  };

  return (
    <div className={styles.container}>
      {options.map((item, index) => (
        <button
          key={`option-variant-${index}-${name}-${item}`}
          className={`${styles.chip} ${
            isSelected(item) ? styles.selected : ""
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
};
