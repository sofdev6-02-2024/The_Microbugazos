"use client";

import { useState } from "react";
import { IoSearch, IoAdd } from "react-icons/io5";
import { toast } from "sonner";
import { useStore } from "@/commons/context/StoreContext";
import { addStoreSeller } from "@/request/SellersRequest";
import MemberList from "./MemberList";
import GeneralModal from "./GeneralModal";
import styles from "@/styles/members-store/members-component.module.css";

const MembersComponent = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { store } = useStore();

  const handleAddSeller = async (email: string) => {
    try {
      const storeId = store?.id;
      if (!storeId) {
        toast.error("Store ID is missing");
        return;
      }
      await addStoreSeller(storeId, email);
      toast.success("Seller added successfully");
      setRefreshTrigger((prev) => prev + 1);
      setIsAddModalOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["member-options"]}>
        <button
          className={styles["add-seller-button"]}
          onClick={() => setIsAddModalOpen(true)}
        >
          <IoAdd />
          Add Seller
        </button>

        <div className={styles.searcher}>
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <IoSearch className={styles["search-icon"]} />
        </div>
      </div>

      <MemberList searchTerm={searchTerm} refreshTrigger={refreshTrigger} />

      <GeneralModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={(email) => handleAddSeller(email)}
        type="add"
      />
    </div>
  );
};

export default MembersComponent;
