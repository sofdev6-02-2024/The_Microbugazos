"use client"
import React, {createContext, useContext, useState, ReactNode, useMemo} from "react";

export interface Option {
    name: string;
    options: [string];
}

export interface OptionsContextType {
    options: Option[]
    addOption: (Option) => void,
    removeOption: (Option) => void,
    setOptions: (options: Option[]) => void
}

const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

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

    const removeOption = (option: Option) => {
        const optionsUpdated = options.filter((item) => item.name != option.name)
        setOptions(optionsUpdated);
    }

    const objValue = useMemo(() => ({
      options,

      addOption,
      removeOption,
      setOptions
    }), [options]);

    return (
        <OptionsContext.Provider value={objValue}>
            {children}
        </OptionsContext.Provider>
    );
};

