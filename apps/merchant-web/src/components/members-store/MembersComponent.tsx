"use client"

import { useState } from 'react';
import MemberList from "./MemberList";
import styles from "@/styles/members-store/members-component.module.css";
import { IoSearch, IoAdd } from "react-icons/io5";
import GeneralModal from "./GeneralModal";
import { toast } from "sonner";
import { useStore } from '@/commons/context/StoreContext';
import {addStoreSeller} from "@/request/SellersRequest";

const MembersComponent = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { store } = useStore();

  const handleAddSeller = async (email: string) => {
    try {
      const storeId = store?.id;
      if (!storeId) {
        toast.error("Store ID is missing.");
        return;
      }
      await addStoreSeller(storeId, email);
      toast.success(`${email} was added correctly`);
    } catch (error: any) {
      toast.error(`Failed to add seller: ${error.message}`);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles['member-options']}>
        <button
          className={styles['add-seller-button']}
          onClick={() => setIsAddModalOpen(true)}
        >
          <IoAdd/>
          Add Seller
        </button>
        <div className={styles.searcher}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <IoSearch size={22}/>
          </button>
        </div>
      </div>
      <MemberList searchTerm={searchTerm}/>
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