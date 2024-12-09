"use client"
import {useProductsView} from "@/contexts/ProductsViewContext";
import FilterBarStyles from "@/styles/store-catalog/FilterBar.module.css"
import FiltersModal from "@/components/catalog/FiltersModal";
import SortModal from "@/components/catalog/SortModal";
import {SwitchDisplayMode} from "@/commons/aux-components/SwitchDisplayMode";

export default function FilterBar() {
  const context = useProductsView();

  return (
    <div className={FilterBarStyles.container}>
      <div className={FilterBarStyles.optionsSection}>
        <FiltersModal></FiltersModal>
        <SortModal></SortModal>
      </div>
      <SwitchDisplayMode
        selectedGridMode={context.isGridView}
        setSelectedMode={context.toggleView}/>
    </div>
  )
}