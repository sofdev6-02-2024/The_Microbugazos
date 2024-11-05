"use client";
import ComboBox from "@/components/combo-box";
import Dropzone from "@/components/image-selector";
import TextField from "@/components/text-field";
import {useEffect, useState} from "react";
import ProductOptionsModal from "@/components/admin-panel/product-options-modal";
import OptionRow from "@/components/admin-panel/option-row";
import {useOptions} from "@/commons/providers/add-product-provider"
import VariantModal from "@/components/admin-panel/variant-modal";
import {Image, useVariants} from "@/commons/providers/variant-provider";
import {ValidateName} from "@/commons/validations/string";
import {ValidateLongText} from "@/commons/validations/string";
import {ValidateNumberWithDecimals} from "@/commons/validations/number";

export default function AddProducts() {
    const [errors, setErrors] = useState<[{textField: string, error: string}]>([]);
    const [productName, setProductName] = useState<string>("");
    const [productDescription, setProductDescription] = useState<string>("");
    const [productBrand, setProductBrand] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>("");
    const [productCategory, setProductCategory] = useState<string>("");
    const [productSubCategory, setProductSubCategory] = useState<string>("");
    const {options} = useOptions();
    const {variants, addVariant, resetVariants} = useVariants();
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [combinationVariants, setCombinationVariants] = useState([]);

    useEffect(() => {
        setCombinationVariants(getVariants());
    }, [options]);

    const validators = [
        {
            field: "productCategory",
            message: "Categories are required",
            validate: () => productCategory !== "" && productSubCategory !== "",
        },
        {
            field: "productName",
            message: "Name is required",
            validate: () => productName !== "",
        },
        {
            field: "productBrand",
            message: "Brand is required",
            validate: () => productBrand !== "",
        },
        {
            field: "productPrice",
            message: "Price is required",
            validate: () => productPrice !== "",
        },
        {
            field: "productImages",
            message: "At least one image is required",
            validate: () => selectedImages.length !== 0,
        }
    ];

    const touchAllFields = () => {
        const newErrors = [...errors];

        validators.forEach(({ field, message, validate }) => {
            const errorIndex = newErrors.findIndex(error => error.textField === field);

            if (!validate()) {
                if (errorIndex === -1) {
                    newErrors.push({ textField: field, error: message });
                }
            } else if (errorIndex !== -1) {
                newErrors.splice(errorIndex, 1);
            }
        });

        setErrors(newErrors);
    };

    const getVariants = () => {
        const optionsList = options.map((item) => item.options);
        return optionsList.reduce((acc, list) => {
            const newAcc = [];
            for (let itemAcc of acc) {
                for (let item of list) {
                    newAcc.push([...itemAcc, item]);
                }
            }
            return newAcc;
        }, options.length > 0 ? [[]] : [["Default"]]);
    };

    const handleFloatNumberChange = (value: string, setter: (value: string) => void) => {
        if (/^-?\d*\.?\d{0,2}$/.test(value)) {
            setter(value);
        }
    };

    const handleComboBoxChange = (value: string, setter: (value: string) => void) => {
        setter(value);
    };

    const parseToCreateProductDTO = () => {
        return {
            name: productName,
            description: productDescription,
            price: productPrice,
            brand: productBrand,
            categories: [{
                category: productCategory,
                subcategory: productSubCategory,
            }],
            images: selectedImages.map((item) => {
                return {
                    altText: `${productName} image (${productDescription})`,
                    url: item
                }
            }),
            productVariants: combinationVariants.map((item) => {
                console.log(item);
                console.log(variants);
                let index;
                if (item == "Default") index = variants.findIndex((i) => i.name == item)
                else index = variants.findIndex((i) => i.name == item.join("/"));
                console.log(index);

                if (index !== -1) {
                    const variant = variants[index];
                    return {
                        image: {
                            altText: variant?.image?.altText ?? '',
                            url: variant?.image?.url ?? ''
                        },
                        priceAdjustment: variant?.priceAdjustment ?? 0.0,
                        stockQuantity: variant?.stockQuantity ?? 0,
                        attributes: options.map((i, index) => {
                            return {
                                name: i.name,
                                value: item[index]
                            }
                        })
                    }
                } else {
                    return {
                        image: {
                            altText: "no image",
                            url: ""
                        },
                        priceAdjustment: 0,
                        stockQuantity: 0,
                        attributes: options.map((i, index) => {
                            return {
                                name: i.name,
                                value: item[index]
                            }
                        })
                    }
                }
            })
        }
    }

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
            <TextField
                label="Name"
                placeholder="Write the name of the product"
                errors={errors}
                setErrors={setErrors}
                value={productName}
                validator={ValidateName}
                onChange={(value: string) => setProductName(value)}
            />
            {errors.find((item) => item.textField == "productName") && <label style={{fontSize: "14px", color: "#FB5012"}}>{errors.find((item) => item.textField == "productName")?.error}</label>}
            <TextField
                label="Description"
                placeholder="Insert description for the product"
                errors={errors}
                setErrors={setErrors}
                value={productDescription}
                validator={ValidateLongText}
                onChange={(value: string) => setProductDescription(value)}
            />
            <TextField
                label="Brand"
                placeholder="Insert brand of the product"
                errors={errors}
                setErrors={setErrors}
                value={productBrand}
                validator={ValidateName}
                onChange={(value: string) => setProductBrand(value)}
            />
            {errors.find((item) => item.textField == "productBrand") && <label style={{fontSize: "14px", color: "#FB5012"}}>{errors.find((item) => item.textField == "productBrand")?.error}</label>}
            <TextField
                label="Price"
                placeholder="100.00 $"
                errors={errors}
                setErrors={setErrors}
                value={productPrice}
                validator={ValidateNumberWithDecimals}
                onChange={(value: string) => handleFloatNumberChange(value, setProductPrice)}
            />
            {errors.find((item) => item.textField == "productPrice") && <label style={{fontSize: "14px", color: "#FB5012"}}>{errors.find((item) => item.textField == "productPrice")?.error}</label>}
            <br/>
            <label className="form-label">Categories</label>
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
            {errors.find((item) => item.textField == "productCategory") && <label style={{fontSize: "14px", color: "#FB5012"}}>{errors.find((item) => item.textField == "productCategory")?.error}</label>}
            <br/>
            <label className="form-label">Images</label>
            <Dropzone selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
            {errors.find((item) => item.textField == "productImages") && <label style={{fontSize: "14px", color: "#FB5012"}}>{errors.find((item) => item.textField == "productImages")?.error}</label>}
            <br/>
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
            {combinationVariants.map((item) => (
                item.length === 0
                    ? <div></div>
                    : <VariantModal key={item} item={item} />
            ))}
            {errors.find((item) => item.textField == "productVariant") && <label style={{fontSize: "14px", color: "#FB5012"}}>{errors.find((item) => item.textField == "productVariant")?.error}</label>}
            <div style={{display: "flex",  justifyContent: "space-evenly", margin: "20px"}}>
                <button className="merchant-button-secondary">Cancel</button>
                <button
                    className="merchant-button"
                    onClick={() => {
                        touchAllFields();
                        if (errors.length == 0) {
                            console.log(parseToCreateProductDTO())
                        }
                    }}
                >Confirm</button>
            </div>
        </body>
    );
}
