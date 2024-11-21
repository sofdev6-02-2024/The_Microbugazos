"use client"

import ProductsViewStyle from "@/styles/store-catalog/ProductsView.module.css"
import {ProductCard} from "@/components/general/ProductCard";
import {ListType} from "@/commons/entities/ListType";
import {useProductsView} from "@/contexts/ProductsViewContext";
import PageSelector from "@/components/PageSelector";
import React from "react";
import Product from "@/commons/entities/concretes/Product";

interface Props {
  products: Array<Product>
}

export default function ProductsView({products}: Readonly<Props>) {
  const context = useProductsView();
  const maxVisiblePagesButton = 5;

  return (
    <div className={ProductsViewStyle.container}>
      <div
        className={
          `${ProductsViewStyle.base} ${
            context.isGridView ? ProductsViewStyle.gridView : ProductsViewStyle.listView
          }`
        }
      >
        {products.map((product) =>
          <ProductCard
            key={product.id}
            product={product}
            type={context.isGridView ? ListType.Card : ListType.List}
          />
        )}
      </div>
      <PageSelector
        page={context.page}
        setPage={context.setPage}
        pages={context.totalPages}
        maxVisible={maxVisiblePagesButton}
      />
    </div>
  );
}