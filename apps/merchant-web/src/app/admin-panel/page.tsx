"use client";
import ComboBox from "@/components/combo-box";
import Dropzone from "@/components/image-selector";
import TextField from "@/components/text-field";
import { useContext, useState } from "react";

export default function AddProducts() {
    const [productName, setProductName] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [productQty, setProductQty] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>("");
    const [productCategory, setProductCategory] = useState<string>("");
    const [productSubCategory, setProductSubCategory] = useState<string>("");

    const handleIntegerNumberChange = (value: string, setter: (value: string) => void) => {
        if (/^\d*$/.test(value)) {
            setter(value);
        }
    };

    const handleFloatNumberChange = (value: string, setter: (value: string) => void) => {
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setter(value);
        }
    };

    const handleComboBoxChange = (value: string, setter: (value: string) => void) => {
        setter(value);
    };

    type Category = "Electronics" | "Clothing & Fashion" | "Beauty & Personal Care" | "Home & Kitchen" | "Health & Wellness";

    const categories: Category[] = [
        "Electronics",
        "Clothing & Fashion",
        "Beauty & Personal Care",
        "Home & Kitchen",
        "Health & Wellness",
    ];

    const subcategories: Record<Category, string[]> = {
        "Electronics": [
            "Mobile Phones",
            "Laptops & Computers",
            "Cameras & Photography",
            "Audio Equipment",
            "Wearable Technology",
            "Smart Home Devices",
            "Television & Video",
            "Gaming Consoles",
        ],
        "Clothing & Fashion": [
            "Men's Clothing",
            "Women's Clothing",
            "Kids' Clothing",
            "Footwear",
            "Accessories",
            "Jewelry",
            "Watches",
            "Handbags & Wallets",
        ],
        "Beauty & Personal Care": [
            "Skincare",
            "Hair Care",
            "Makeup",
            "Fragrances",
            "Personal Hygiene",
            "Men's Grooming",
            "Oral Care",
            "Bath & Body",
        ],
        "Home & Kitchen": [
            "Furniture",
            "Home Decor",
            "Kitchen & Dining",
            "Bedding & Linens",
            "Cleaning Supplies",
            "Storage & Organization",
            "Lighting",
            "Outdoor & Garden",
        ],
        "Health & Wellness": [
            "Supplements & Vitamins",
            "Fitness Equipment",
            "Medical Supplies",
            "Personal Care Appliances",
            "Mental Wellness",
            "First Aid",
            "Yoga & Meditation",
            "Massage & Relaxation",
        ],
    };

    return (
        <body>
        <label className="heading-1">Add Product</label>
        <form>
            <TextField
                label="Name"
                placeholder="Write the name of the product"
                value={productName}
                onChange={(value: string) => setProductName(value)}
            />
            <TextField
                label="Description"
                placeholder="Insert description for the product"
                value={productDescription}
                onChange={(value: string) => setProductDescription(value)}
            />
            <TextField
                label="Quantity"
                placeholder="000"
                value={productQty}
                onChange={(value: string) => handleIntegerNumberChange(value, setProductQty)}
            />
            <TextField
                label="Price"
                placeholder="100.00 $"
                value={productPrice}
                onChange={(value: string) => handleFloatNumberChange(value, setProductPrice)}
            />
            <div className="category-section">
                <ComboBox
                    value={productCategory}
                    options={categories}
                    handleChange={(value) => {
                        handleComboBoxChange(value, setProductCategory)
                        setProductSubCategory("")
                    }}
                />
                <div style={{width: '24px'}}></div>
                <ComboBox
                    value={productSubCategory}
                    options={subcategories[productCategory as Category] ?? []}
                    handleChange={(value) => handleComboBoxChange(value, setProductSubCategory)}
                />
            </div>
            <label className="form-label">Images</label>
            <Dropzone/>
            <label className="form-label">Other Specifications</label>
            <div className="key-value-section">
                <TextField
                    label="Key"
                    placeholder="Some key"
                    value={productQty}
                    onChange={(value: string) => handleIntegerNumberChange(value, setProductQty)}
                />
                <div style={{width: '24px'}}></div>
                <TextField
                    label="Value"
                    placeholder="Some value"
                    value={productQty}
                    onChange={(value: string) => handleIntegerNumberChange(value, setProductQty)}
                />
            </div>
        </form>
        <button className="merchant-button" onClick={() => console.log("Hola")}>
            Confirm
        </button>
        </body>
    );
}
