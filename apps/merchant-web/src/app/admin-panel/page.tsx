"use client";
import ComboBox from "@/components/combo-box";
import Dropzone from "@/components/image-selector";
import TextField from "@/components/text-field";
import {useState} from "react";
import ProductOptionsModal from "@/components/admin-panel/product-options-modal";
import OptionRow from "@/components/admin-panel/option-row";
import {useOptions} from "@/commons/providers/add-product-provider"
import VariantModal from "@/components/admin-panel/variant-modal";
import {useVariants} from "@/commons/providers/variant-provider";

export default function AddProducts() {
    const [productName, setProductName] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [productQty, setProductQty] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>("");
    const [productCategory, setProductCategory] = useState<string>("");
    const [productSubCategory, setProductSubCategory] = useState<string>("");
    const {options} = useOptions();
    const {variants, getByName} = useVariants();
    const [selectedImages, setSelectedImages] = useState<string[]>([]);


    const getVariants = () => {
        const optionsList = options.map((item) => item.options);
        return optionsList.reduce((acc, list) => {
            const newAcc = [];
            for (let itemAcc of acc) {
                for (let item of list) {
                    newAcc.push([...itemAcc, item]);
                }
            }
            return newAcc
        }, [[]]);
    }


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
            <Dropzone selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
            <label className="form-label">Other Specifications</label>
            <div style={{marginBottom: "16px"}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <label>Options</label>
                    <ProductOptionsModal></ProductOptionsModal>
                </div>
                {options && options.length > 0 ? (
                    options.map((item) => (
                        <OptionRow key={item.name} hasInfo={true} option={item} />
                    ))
                ) : (
                    <OptionRow hasInfo={false} />
                )}
            </div>
            <label className="form-label">Variants</label>
            {getVariants().map((item) =>
                <VariantModal item={item}></VariantModal>
            )}
            <div style={{display: "flex",  justifyContent: "space-evenly", margin: "20px"}}>
                <button className="merchant-button-secondary">Cancel</button>
                <button className="merchant-button">Confirm</button>
            </div>
        </form>
        </body>
    );
}
