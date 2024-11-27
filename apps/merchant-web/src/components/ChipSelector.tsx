"use client"
import {useState} from "react";
import ChipSelectorStyle from "@/styles/general/ChipSelector.module.css"

interface ChipSelectorProps {
  name: string,
  options: string[],
  handleChange: (string, number) => void,
  defaultValue?: number,
}

export default function ChipSelector({name, options, handleChange, defaultValue} : ChipSelectorProps) {
    const [indexSelected, setIndexSelected] = useState(defaultValue ?? -1);
    return (
        <div className={ChipSelectorStyle.container}>
            {options.map((item, index) => <div
              key={index}
              className={`${ChipSelectorStyle.chip} ${index == indexSelected && ChipSelectorStyle.selected}`}
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
            </div>)}
        </div>
    )
}