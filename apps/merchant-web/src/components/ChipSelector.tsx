"use client"
import {useState} from "react";

interface ChipSelectorProps {
    name: string,
    options: string[],
    handleChange: (string, number) => void
}

export default function ChipSelector({name, options, handleChange} : ChipSelectorProps) {
    const [indexSelected, setIndexSelected] = useState(-1);
    return (
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "8px"}}>
            {options.map((item, index) => <div style={{
                padding: "2px 12px 2px 12px",
                borderRadius: "12px",
                justifyContent: "center",
                alignItems: "center",
                color: index == indexSelected ? "#FFF" : "#000",
                backgroundColor: index == indexSelected ? "#7790ED" : "#ffdfe9",
            }} onClick={() => {
                setIndexSelected(index);
                console.log(name);
                console.log(index);
                handleChange(name, index);
            }}
            >
                {item}
            </div>)}
        </div>
    )
}