import {createContext, ReactNode, useContext, useMemo, useState} from "react";

interface Type {
  isGridView: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  reloadSignal: boolean;

  toggleView: () => void;
  sendReloadSignal: () => void;
  setPage: (number) => void;
  setTotalPages: (number) => void;
}

export const ProductsViewContext = createContext<Type | undefined>(undefined);

export const useProductsView = () => {
  const context = useContext(ProductsViewContext);
  if (!context) {
    throw new Error(
      "useProductsView must be used within a ProductsViewProvider"
    );
  }
  return context;
};

export const ProductsViewProvider = ({children}: {children: ReactNode}) => {
  const pageSize = 24;
  const [reloadSignal, setReloadSignal] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const toggleView = () => {
    setIsGridView((prev) => !prev);
  };

  const sendReloadSignal = () => {
    setReloadSignal(!reloadSignal);
  }

  const objValue = useMemo(() => ({
    isGridView,
    page,
    pageSize,
    totalPages,
    reloadSignal,
    toggleView,
    sendReloadSignal,
    setPage,
    setTotalPages,
  }), [isGridView, page, totalPages, reloadSignal]);

  return (
    <ProductsViewContext.Provider
      value={objValue}
    >
      {children}
    </ProductsViewContext.Provider>
  );
}