"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Option {
    name: string;
    options: [string];
}

export interface OptionsContextType {
    options: Option[]
}

const OptionsContext = createContext<OptionsContextType>({
    options: [],
});

export const useOptions = () => {
    const context = useContext(OptionsContext);
    if (!context) {
        throw new Error("useOptions must be used within a OptionsProvider");
    }
    return context;
};

interface OptionsProviderProps {
    children: ReactNode;
}

export const OptionsProvider: React.FC<OptionsProviderProps> = ({ children }) => {
    const [options, setOptions] = useState<Option[]>([]);

    const addOption = (newOption: Option) => {
        const sameNameOptions = options.filter((item) => item.name == newOption.name)
        if (sameNameOptions.length == 0) {
            setOptions([...options, newOption]);
        }
    };

    const removeOption =(option: Option) => {
        const optionsUpdated = options.filter((item) => item.name != option.name)
        setOptions(optionsUpdated);
    }

    return (
        <OptionsContext.Provider value={{ options, addOption, removeOption }}>
            {children}
        </OptionsContext.Provider>
    );
};

