"use client"
import {useState} from "react";


export default function QuantitySelector() {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityIncrement = () => {
        setQuantity(quantity + 1);
    }

    const handleQuantityDecrement = () => {
        if (quantity >= 2) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div style={{
            width: "15vw",
            minWidth: "144px",
            borderRadius: "24px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "4px 12px 4px 12px",
            backgroundColor: "#ffdfe9",
            gap: "24px",
        }}>
            <button
                onClick={handleQuantityDecrement}
                style={{
                    padding: "4px 12px 4px 12px",
                    fontSize: "32px",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#000",
                    cursor: "pointer",
                }}
            >-</button>
            <label
                style={{
                    fontSize: "24px"
                }}
            >{quantity}</label>
            <button
                onClick={handleQuantityIncrement}
                style={{
                    padding: "4px 12px 4px 12px",
                    fontSize: "32px",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#000",
                    cursor: "pointer",
                }}
            >+</button>
        </div>
    )
}