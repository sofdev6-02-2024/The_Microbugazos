"use client";
import { Button } from "@/components/atoms/buttons/Button";
import { FaPlus } from "react-icons/fa6";
import { Searcher } from "../header/searchbar/searcher";
import { IoFilter } from "react-icons/io5";
import "@/styles/inventory/admin-store-inventory.css";
import { useRouter } from "next/navigation";

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

  const handleFilters = () => {
    console.log("filtering ...");
  };

  return (
    <div className="admin-store-inventory-bar">
      <Button
        type={"button"}
        disabled={false}
        handleClick={handleAddNewProduct}
      >
        <FaPlus />{" "}
        <span className="admin-store-inventory-btn-text">Add Products</span>
      </Button>
      <div className="admin-store-inventory-search">
        <Searcher
          onSearch={handleSearch}
          value={searchTerm}
          changeValue={setSearchTerm}
        />
      </div>
      <Button
        type={"button"}
        disabled={false}
        handleClick={handleFilters}
        style={{ visibility: "hidden", userSelect: "none" }}
      >
        <IoFilter />{" "}
        <span className="admin-store-inventory-btn-text">Filters</span>
      </Button>
    </div>
  );
};
