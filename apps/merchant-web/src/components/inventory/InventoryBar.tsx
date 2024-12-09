"use client";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import "@/styles/inventory/admin-store-inventory.css";
import { Searcher } from "../header/searchbar/searcher";
import { Button } from "@/components/atoms/buttons/Button";
import { IoSettingsOutline } from "react-icons/io5";
import FiltersModal from "@/components/catalog/FiltersModal";
import { useAuth } from "@/commons/context/AuthContext";
import { UserType } from "@/types/auth";

interface InventoryBarProps {
  handleSearch: (searchTerm: string) => Promise<void>;
  setSearchTerm: (searchTerm: string) => void;
  openConfigureModal: () => void;
  searchTerm: string;
}

export const InventoryBar = ({
  handleSearch,
  setSearchTerm,
  searchTerm,
  openConfigureModal,
}: InventoryBarProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const handleAddNewProduct = () => {
    router.push("/store/add-product");
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
      {user?.userType === UserType.OWNER && (
        <Button
          type={"button"}
          disabled={false}
          handleClick={openConfigureModal}
        >
          <IoSettingsOutline fontSize={24} />
        </Button>
      )}
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
