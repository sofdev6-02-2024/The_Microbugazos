"use client"

import {LayoutGrid, LayoutList, ListFilter, ArrowDownUp} from "lucide-react";
import Switch from "@/components/Switch";
import {useProductsView} from "@/contexts/ProductsViewContext";
import FilterBarStyles from "@/styles/store-catalog/FilterBar.module.css"
import FiltersModal from "@/components/catalog/FiltersModal";
import SortModal from "@/components/catalog/SortModal";

export default function FilterBar() {
  const context = useProductsView();

  return (
    <div className={FilterBarStyles.container}>
      <div className={FilterBarStyles.optionsSection}>
        <FiltersModal></FiltersModal>
        <SortModal></SortModal>
      </div>
      <Switch
        value={context.isGridView}
        toggleFunction={context.toggleView}
        leftIcon={LayoutGrid}
        rightIcon={LayoutList}
      ></Switch>
    </div>
  )
}