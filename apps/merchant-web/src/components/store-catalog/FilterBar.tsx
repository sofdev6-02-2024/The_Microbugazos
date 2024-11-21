"use client"

import {LayoutGrid, LayoutList, ListFilter, ArrowDownUp} from "lucide-react";
import {useEffect} from "react";
import Switch from "@/components/Switch";
import {useProductsView} from "@/contexts/ProductsViewContext";
import FilterBarStyles from "@/styles/store-catalog/FilterBar.module.css"

export default function FilterBar() {
  const context = useProductsView();

  return (
    <div className={FilterBarStyles.container}>
      <div className={FilterBarStyles.optionsSection}>
        <button className={FilterBarStyles.button}>
          <ListFilter></ListFilter>
          <span>Filter</span>
        </button>
        <button className={FilterBarStyles.button}>
          <ArrowDownUp></ArrowDownUp>
          <span>Sort</span>
        </button>
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