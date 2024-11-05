"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Image {
    url: string;
    altText: string;
}

export interface Variant {
    name: string;
    priceAdjustment: string;
    stockQuantity: number;
    image: Image;
}

export interface VariantContextType {
    variants: Variant[]
}

const VariantContext = createContext<VariantContextType>({
    variants: [],
});

export const useVariants = () => {
    const context = useContext(VariantContext);
    if (!context) {
        throw new Error("useOptions must be used within a OptionsProvider");
    }
    return context;
};

interface VariantsProviderProps {
    children: ReactNode;
}

export const VariantsProvider: React.FC<VariantsProviderProps> = ({ children }) => {
    const [variants, setVariants] = useState<Variant[]>([]);

    const resetVariants = () => {
        setVariants([]);
    }

    const addVariant = (newVariant: Variant) => {
        const sameNameVariant = variants.filter((item) => item.name == newVariant.name)
        if (sameNameVariant.length == 0) {
            setVariants([...variants, newVariant]);
        } else {
            const updateVariant = variants.filter((i) => i.name == newVariant.name);
            setVariants([...updateVariant, newVariant])
        }
        console.log(variants);
    };

    const removeVariant = (variant: string) => {
        const variantsUpdated = variants.filter((item) => item.name != variant)
        setVariants(variantsUpdated);
    }

    const getByName = (name: string) => {
        const sameNameVariants = variants.filter((item) => item.name == name);
        if (sameNameVariants.length != 0) {
            return sameNameVariants[0];
        } else return null;
    }

    return (
        <VariantContext.Provider value={{ variants, addVariant, removeVariant, getByName, resetVariants }}>
            {children}
        </VariantContext.Provider>
    );
};

