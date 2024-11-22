import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";

interface Type {
  isApplied: boolean,
  nameAscending: boolean | null,
  priceAscending: boolean | null,
  ratingAscending: boolean | null,
  setIsApplied: (boolean) => void,
  setNameAscending: (boolean) => void,
  setPriceAscending: (boolean) => void,
  setRatingAscending: (boolean) => void,
  getQuery: () => string,
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
  const [isApplied, setIsApplied] = useState(false);
  const [nameAscending, setNameAscending] = useState();
  const [priceAscending, setPriceAscending] = useState();
  const [ratingAscending, setRatingAscending] = useState();

  useEffect(() => {
    console.log(nameAscending);
    console.log(priceAscending);
    console.log(ratingAscending);
  }, [nameAscending, priceAscending, ratingAscending]);

  const getQuery = () => {
    if (!isApplied) return "";
    let query = "";

    if (nameAscending != null) {
      query += `&NameAsc=${nameAscending}`;
    }

    if (priceAscending != null) {
      query += `&PriceAsc=${priceAscending}`;
    }

    if (ratingAscending != null) {
      query += `&RatingAsc=${ratingAscending}`;
    }

    return query;
  }

  const objValue = useMemo(() => ({
    isApplied,
    nameAscending,
    priceAscending,
    ratingAscending,
    setIsApplied,
    setNameAscending,
    setPriceAscending,
    setRatingAscending,
    getQuery,
  }), [isApplied, nameAscending, priceAscending, ratingAscending]);

  return (
    <SortContext.Provider
      value={objValue}
    >
      {children}
    </SortContext.Provider>
  );
}