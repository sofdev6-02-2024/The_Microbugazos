import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";

interface Type {
  isApplied: boolean,
  categoryId: string,
  subcategoryId: string,
  priceRange: Array<number>,
  ratingRange: Array<number>,
  setIsApplied: (boolean) => void,
  setCategoryId: (string) => void,
  setSubcategoryId: (string) => void,
  setPriceRange: (Array) => void,
  setRatingRange: (Array) => void,
  getQuery: () => string,
}


export const FiltersContext = createContext<Type | undefined>(undefined);

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error(
      "useFiltersContext must be used within a FiltersProvider"
    );
  }
  return context;
};

export const FiltersProvider = ({children}: {children: ReactNode}) => {
  const [isApplied, setIsApplied] = useState(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [subcategoryId, setSubcategoryId] = useState<string>("");
  const [priceRange, setPriceRange] = useState<Array<number>>([100, 500]);
  const [ratingRange, setRatingRange] = useState<Array<number>>([1, 2.5]);

  useEffect(() => {
    console.log(categoryId);
    console.log(subcategoryId);
    console.log(priceRange);
    console.log(ratingRange);
  }, [priceRange, ratingRange]);

  const getQuery = () => {
    if (!isApplied) return "";
    let query = "";

    if (categoryId === "") {
      query += `&CategoryId=${subcategoryId !== "" ? subcategoryId : categoryId}`
    }

    query += `&MinPrice=${priceRange[0]}&MaxPrice=${priceRange[1]}`;
    query += `&MinRating=${ratingRange[0]}&MaxRating=${ratingRange[1]}`;
    return query;
  }

  const objValue = useMemo(() => ({
    isApplied,
    categoryId,
    subcategoryId,
    priceRange,
    ratingRange,
    setIsApplied,
    setCategoryId,
    setSubcategoryId,
    setPriceRange,
    setRatingRange,
    getQuery,
  }), [isApplied, categoryId, subcategoryId, priceRange, ratingRange]);

  return (
    <FiltersContext.Provider
      value={objValue}
    >
      {children}
    </FiltersContext.Provider>
  );
}