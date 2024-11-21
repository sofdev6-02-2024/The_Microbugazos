import React, { useState } from 'react';
import styles from "@/styles/members-store/card-member.module.css"
import { FiTrash2 } from "react-icons/fi";
import GeneralModal from './GeneralModal';
import { toast } from 'sonner';

const MemberCard: React.FC<{
  member: { name: string; type: string },
  onDelete: (name: string) => void
}> = ({ member, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete(member.name);
    toast.success(`The user ${member.name} was removed from sellers`);
  };

  return (
    <div className={styles.container}>
      <div className={styles['member-info']}>
        <h3>{member.name}</h3>
      </div>
      <div className={styles['actions-container']}>
        <div className={styles['type-member']}>
          <p>{member.type}</p>
        </div>
        <button
          className={styles['red-button']}
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <FiTrash2 size={30} />
        </button>
      </div>
      <GeneralModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        type="delete"
        memberName={member.name}
      />
    </div>
  );
};

export default MemberCard;
