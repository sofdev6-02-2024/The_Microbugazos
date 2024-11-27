"use client";

import { useState } from "react";
import ChipSelectorStyle from "@/styles/general/ChipSelector.module.css";

interface ChipSelectorProps {
  name: string;
  options: string[];
  handleChange: (name: string, option: number) => void;
  defaultValue?: number;
}

export const ChipSelector = ({
  name,
  options,
  handleChange,
  defaultValue,
}: Readonly<ChipSelectorProps>) => {
  const [indexSelected, setIndexSelected] = useState(defaultValue ?? -1);
  return (
    <div className={ChipSelectorStyle.container}>
      {options.map((item, index) => (
        <button
          key={`chip-select-${index}-${item}`}
          className={`${ChipSelectorStyle.chip} ${
            index == indexSelected && ChipSelectorStyle.selected
          }`}
          onClick={() => {
            let newIndex = index;
            if (indexSelected == index) {
              newIndex = -1;
            }

            setIndexSelected(newIndex);
            handleChange(name, newIndex);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
