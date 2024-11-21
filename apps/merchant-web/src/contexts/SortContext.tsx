import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";

interface Type {
  nameAscending: boolean | null,
  priceAscending: boolean | null,
  ratingAscending: boolean | null,
  setNameAscending: (boolean) => void,
  setPriceAscending: (boolean) => void,
  setRatingAscending: (boolean) => void,
}


export const SortContext = createContext<Type | undefined>(undefined);

export const useSortContext = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error(
      "useSortContext must be used within a SortProvider"
    );
  }
  return context;
};

export const SortProvider = ({children}: {children: ReactNode}) => {
  const [isApplied, setIsApplied] = useState(true);
  const [nameAscending, setNameAscending] = useState();
  const [priceAscending, setPriceAscending] = useState();
  const [ratingAscending, setRatingAscending] = useState();

  useEffect(() => {
    console.log(nameAscending);
    console.log(priceAscending);
    console.log(ratingAscending);
  }, [nameAscending, priceAscending, ratingAscending]);

  const objValue = useMemo(() => ({
    isApplied,
    nameAscending,
    priceAscending,
    ratingAscending,
    setIsApplied,
    setNameAscending,
    setPriceAscending,
    setRatingAscending,
  }), [isApplied, nameAscending, priceAscending, ratingAscending]);

  return (
    <SortContext.Provider
      value={objValue}
    >
      {children}
    </SortContext.Provider>
  );
}