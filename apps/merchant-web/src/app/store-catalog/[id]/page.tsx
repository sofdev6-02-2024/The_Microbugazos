"use client"

import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {ThemeProvider} from "@/commons/context/ThemeContext";
import {StoreProfile} from "@/components/store-catalog/StoreProfile";
import FilterBar from "@/components/store-catalog/FilterBar";
import {ProductsViewProvider} from "@/contexts/ProductsViewContext";
import ProductsView from "@/components/store-catalog/ProductsView";
import Product from "@/commons/entities/concretes/Product";
import axiosInstance from "@/request/AxiosConfig";

export default function StoreCatalog() {
  const { id } = useParams<string>();
  const [products, setProducts] = useState<Array<Product>>();

  useEffect(() => {
    axiosInstance
      .get(`/inventory/Product/byStore/${id}?page=${1}&pageSize=${4}`)
      .then(response => response.data)
      .then(data => setProducts(data.data.items))
      .catch(e => console.error(e));
  }, []);

  return (
    <ThemeProvider>
      <ProductsViewProvider>
        <main>
          <StoreProfile storeId={id}/>
          <FilterBar></FilterBar>
          <ProductsView products={products ?? []}></ProductsView>
        </main>
      </ProductsViewProvider>
    </ThemeProvider>
  );
}