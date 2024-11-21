"use client";
import { Button } from "@/components/atoms/buttons/Button";
import { FaPlus } from "react-icons/fa6";
import { Searcher } from "../header/searchbar/searcher";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import "@/styles/inventory/admin-store-inventory.css";

export const InventoryBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div className="admin-store-inventory-bar">
      <Button type={"button"} disabled={false}>
        <FaPlus />{" "}
        <span className="admin-store-inventory-btn-text">Add Products</span>
      </Button>
      <div className="admin-store-inventory-search">
        <Searcher
          value={searchValue}
          changeValue={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Button type={"button"} disabled={false}>
        <IoFilter />{" "}
        <span className="admin-store-inventory-btn-text">Filters</span>
      </Button>
    </div>
  );
};
