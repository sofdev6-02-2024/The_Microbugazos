import { useState } from "react";
import { SortingType } from "@/commons/entities/SortingType";
import { SortingProduct } from "../entities/SortingProduct";

export const useSorting = (initialSorting: SortingProduct) => {
  const [sorting, setSorting] = useState(initialSorting);

  const handleSorting = (columnName: keyof SortingProduct) => {
    setSorting((prev) => {
      const newSortValue =
        prev[columnName] === SortingType.ASC
          ? SortingType.DESC
          : prev[columnName] === SortingType.DESC
          ? SortingType.NONE
          : SortingType.ASC;

      const updatedSorting = { ...prev };

      for (const key in updatedSorting) {
        if (key !== columnName) {
          updatedSorting[key as keyof SortingProduct] = SortingType.NONE;
        }
      }
      updatedSorting[columnName] = newSortValue;
      return updatedSorting;
    });
  };

  return { sorting, handleSorting };
};
