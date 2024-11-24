"use client"

import React, {useEffect, useState} from "react";
import DotLoader from "react-spinners/DotLoader";
import {ListType} from "@/commons/entities/ListType";
import Product from "@/commons/entities/concretes/Product";
import {ProductCard} from "@/components/general/ProductCard";
import PageSelector from "@/components/PageSelector";
import {useProductsView} from "@/contexts/ProductsViewContext";
import {GetProductsByStore} from "@/services/storeCatalogService";
import ProductsViewStyle from "@/styles/store-catalog/ProductsView.module.css"
import {useFiltersContext} from "@/contexts/FiltersContext";
import {useSortContext} from "@/contexts/SortContext";

interface Props {
  id: string
}

export default function ProductsView({id}: Readonly<Props>) {
  const context = useProductsView();
  const maxVisiblePagesButton = 5;
  const [products, setProducts] = useState<Array<Product>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const filtersContext = useFiltersContext();
  const sortContext = useSortContext();

  useEffect(() => {
    setIsLoading(true);
    GetProductsByStore(id, context.page, context.pageSize, `${filtersContext.getQuery()}${sortContext.getQuery()}`)
      .then(data => {
        setProducts(data.data.items.map(product =>
          new Product(
            product.productId,
            product.storeId,
            product.name,
            product.description,
            product.price,
            product.brand,
            product.images,
            product.productVariants,
            product.categories,
            product.productReviews,
            )));
        context.setTotalPages(data.data.totalPages);
      })
      .finally(() => setIsLoading(false));
  }, [id, context.page, context.reloadSignal,  filtersContext.isApplied, sortContext.isApplied]);

  return (
    <div className={ProductsViewStyle.container}>
      {isLoading ? (
        <div className={`${ProductsViewStyle.spinnerContainer}`}>
          <DotLoader size={64} color="#7790ED" loading={true}></DotLoader>
        </div>
      ) : (
        <div
          className={
            `${ProductsViewStyle.base} ${
              context.isGridView ? ProductsViewStyle.gridView : ProductsViewStyle.listView
            }`
          }
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              type={context.isGridView ? ListType.Card : ListType.List}
            />
          ))}
        </div>
      )}
      <PageSelector
        page={context.page}
        setPage={context.setPage}
        pages={context.totalPages}
        maxVisible={maxVisiblePagesButton}
      />
    </div>
  );
}