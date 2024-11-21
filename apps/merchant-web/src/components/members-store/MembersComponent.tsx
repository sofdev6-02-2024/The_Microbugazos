"use client"

import { useState } from 'react';
import MemberList from "./MemberList";
import styles from "@/styles/members-store/members-component.module.css";
import { IoSearch, IoAdd } from "react-icons/io5";
import GeneralModal from "./GeneralModal";
import { toast } from "sonner";

const MembersComponent = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddSeller = (email: string) => {
    toast.success(`${email} was added correctly`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.memberOptions}>
        <button
          className={styles.addSellerButton}
          onClick={() => setIsAddModalOpen(true)}
        >
          <IoAdd/>
          Add Seller
        </button>
        <div className={styles.searcher}>
          <input
            type="text"
            placeholder="Search..."
          />
          <button>
            <IoSearch size={22}/>
          </button>
        </div>
      </div>
      <MemberList/>
      <GeneralModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={() => handleAddSeller('')}
        type="add"
      />
    </div>
  );
};

export default MembersComponent;