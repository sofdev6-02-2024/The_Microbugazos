"use client"
import {useState} from "react";

interface ChipSelectorProps {
    options: string[]
}

export default function ChipSelector({options} : ChipSelectorProps) {
    const [indexSelected, setIndexSelected] = useState(-1);
    return (
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "8px"}}>
            {options.map((item, index) => <div style={{
                padding: "2px 12px 2px 12px",
                borderRadius: "12px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: index == indexSelected ? "#7790ED" : "#ffdfe9",
            }} onClick={() => setIndexSelected(index)}
            >
                {item}
            </div>)}
        </div>
    )
}