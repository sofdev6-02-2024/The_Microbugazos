"use client";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import "@/styles/inventory/admin-store-inventory.css";
import { Searcher } from "../header/searchbar/searcher";
import { Button } from "@/components/atoms/buttons/Button";
import FiltersModal from "@/components/catalog/FiltersModal";

interface InventoryBarProps {
  handleSearch: (searchTerm: string) => Promise<void>;
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
}

export const InventoryBar = ({
  handleSearch,
  setSearchTerm,
  searchTerm,
}: InventoryBarProps) => {
  const router = useRouter();
  const handleAddNewProduct = () => {
    router.push("add-product");
  };


  return (
    <div className="admin-store-inventory-bar">
      <Button
        type={"button"}
        disabled={false}
        handleClick={handleAddNewProduct}
      >
        <FaPlus fontSize={24} />{" "}
        <span className="admin-store-inventory-btn-text">Add Products</span>
      </Button>
      <div className="admin-store-inventory-search">
        <Searcher
          onSearch={handleSearch}
          value={searchTerm}
          changeValue={setSearchTerm}
        />
      </div>
      <FiltersModal buttonStyleClass="admin-store-inventory-btn-text"></FiltersModal>
    </div>
  );
};
