"use client"

import {useParams} from "next/navigation";
import {ThemeProvider} from "@/commons/context/ThemeContext";
import {StoreProfile} from "@/components/catalog/StoreProfile";
import FilterBar from "@/components/catalog/FilterBar";
import {ProductsViewProvider} from "@/contexts/ProductsViewContext";
import ProductsView from "@/components/catalog/ProductsView";
import {FiltersProvider} from "@/contexts/FiltersContext";
import {SortProvider} from "@/contexts/SortContext";
import {GetProductsByStore} from "@/services/storeCatalogService";

export default function StoreCatalog() {
  const { id } = useParams<{ id: string }>();

  return (
    <ThemeProvider>
        <ProductsViewProvider>
          <FiltersProvider>
          <SortProvider>
          <main>
            <StoreProfile storeId={id}/>
            <FilterBar></FilterBar>
            <ProductsView
              fetchConfig={{
                fetchFn: GetProductsByStore,
                id: id
              }}
            />
          </main>
          </SortProvider>
          </FiltersProvider>
        </ProductsViewProvider>
    </ThemeProvider>
  );
}