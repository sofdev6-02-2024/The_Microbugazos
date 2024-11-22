"use client"

import React from "react";
import {useParams} from "next/navigation";
import {ThemeProvider} from "@/commons/context/ThemeContext";
import {StoreProfile} from "@/components/catalog/StoreProfile";
import FilterBar from "@/components/catalog/FilterBar";
import {ProductsViewProvider} from "@/contexts/ProductsViewContext";
import ProductsView from "@/components/catalog/ProductsView";
import {FiltersProvider} from "@/contexts/FiltersContext";
import {SortProvider} from "@/contexts/SortContext";

export default function StoreCatalog() {
  const { id } = useParams<string>();

  return (
    <ThemeProvider>
        <ProductsViewProvider>
          <FiltersProvider>
          <SortProvider>
          <main>
            <StoreProfile storeId={id}/>
            <FilterBar></FilterBar>
            <ProductsView id={id}></ProductsView>
          </main>
          </SortProvider>
          </FiltersProvider>
        </ProductsViewProvider>
    </ThemeProvider>
  );
}