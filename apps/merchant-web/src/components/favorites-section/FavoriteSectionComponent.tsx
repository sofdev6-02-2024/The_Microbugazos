import styles from "@/styles/favorites/FavoritesComponent.module.css";
import React from "react";
import {FiltersProvider} from "@/contexts/FiltersContext";
import {SortProvider} from "@/contexts/SortContext";
import FilterBar from "@/components/catalog/FilterBar";
import ProductsView from "@/components/catalog/ProductsView";
import {ProductsViewProvider} from "@/contexts/ProductsViewContext";
import {GetFavoriteProductsByUser} from "@/services/favoritesProductsService";
import useAuth from "@/hooks/useAuth";
import {CircularProgress} from "@nextui-org/react";

export const FavoriteSectionComponent = () => {
  const {user} = useAuth();
  return (
    <div className={styles["container"]}>
      <div className={styles["sc-container"]}>
        <h1 className={styles["title"]}>Your Favorite Products</h1>
      </div>
      <hr className={styles["line"]}/>
      {user?.userId ? (
        <ProductsViewProvider>
          <FiltersProvider>
            <SortProvider>
              <main>
                <FilterBar></FilterBar>
                <ProductsView
                  fetchConfig={{
                    fetchFn: GetFavoriteProductsByUser,
                    id: user?.userId,
                  }}
                  view={"favorite"}
                />
              </main>
            </SortProvider>
          </FiltersProvider>
        </ProductsViewProvider>
      ) : (
        <div className={styles["order-charging-container"]}>
          <CircularProgress size="lg" label="Loading your favorite products..."/>
        </div>
      )}
    </div>
  );
};