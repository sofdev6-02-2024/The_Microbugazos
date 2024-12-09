"use client";

import React, { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import { ListType } from "@/commons/entities/ListType";
import Product from "@/commons/entities/concretes/Product";
import { ProductCard } from "@/components/general/ProductCard";
import PageSelector from "@/components/PageSelector";
import { useProductsView } from "@/contexts/ProductsViewContext";
import ProductsViewStyle from "@/styles/store-catalog/ProductsView.module.css";
import { useFiltersContext } from "@/contexts/FiltersContext";
import { useSortContext } from "@/contexts/SortContext";

interface FetchConfig {
  fetchFn: (id: string, page: number, pageSize: number, queryParams: string) => Promise<any>;
  id: string;
}

interface Props {
  fetchConfig: FetchConfig;
  view?: string;
}

export default function ProductsView({ fetchConfig, view }: Readonly<Props>) {
  const context = useProductsView();
  const maxVisiblePagesButton = 5;
  const [products, setProducts] = useState<Array<Product>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const filtersContext = useFiltersContext();
  const sortContext = useSortContext();

  useEffect(() => {
    setIsLoading(true);
    fetchConfig
      .fetchFn(
        fetchConfig.id,
        context.page,
        context.pageSize,
        `${filtersContext.getQuery()}${sortContext.getQuery()}`
      )
      .then((data) => {
        setProducts(
          data.data.items.map(
            (product: Product) =>
              new Product(
                product.id,
                product.storeId,
                product.name,
                product.description,
                product.price,
                product.brand,
                product.isLiked,
                product.images,
                product.rating,
                product.productVariants,
                product.categories,
              )
          )
        );
        context.setTotalPages(
          Math.ceil(data.data.totalPages)
        );
      })
      .finally(() => setIsLoading(false));
  }, [
    fetchConfig.id,
    context.page,
    context.reloadSignal,
    filtersContext.isApplied,
    sortContext.isApplied,
  ]);

  const handleDislike = (productId: string) => {
    if (view === 'favorite') {
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    }
  };

  return (
    <div className={ProductsViewStyle.container}>
      {isLoading ? (
        <div className={`${ProductsViewStyle.spinnerContainer}`}>
          <DotLoader size={64} color="#7790ED" loading={true}></DotLoader>
        </div>
      ) : (
        <>
          {view === 'favorite' && products.length === 0 ? (
            <div className={ProductsViewStyle.noFavorites}>
              <img
                src="https://res.cloudinary.com/playhardimages/image/upload/v1733726658/heart_cdkppy.png"
                alt="No favorites"
                className={ProductsViewStyle.noFavoritesImage}
              />
              <label>You have not added any articles to your favorites section yet.</label>
            </div>
          ) : (
            <div
              className={`${ProductsViewStyle.base} ${
                context.isGridView
                  ? ProductsViewStyle.gridView
                  : ProductsViewStyle.listView
              }`}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  type={context.isGridView ? ListType.Card : ListType.List}
                  onDislike={handleDislike}
                />
              ))}
            </div>
          )}
        </>
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
