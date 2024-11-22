import { useState } from 'react';
import { FiTrash2 } from "react-icons/fi";
import { Member } from "@/schemes/sellers/sellers";
import { deleteStoreSeller } from "@/request/SellersRequest";
import { useStore } from "@/commons/context/StoreContext";
import { toast } from "sonner";
import GeneralModal from './GeneralModal';
import styles from "@/styles/members-store/card-member.module.css"

interface MemberCardProps {
  member: Member;
  onDelete: (memberId: string) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { store } = useStore();

  const handleDelete = async () => {
    if (!store?.id || !member.id) {
      toast.error("Store or member information not found");
      return;
    }

    try {
      setIsDeleting(true);
      await deleteStoreSeller(store.id, member.id);
      toast.success(`The user ${member.name} was removed from sellers`);
      setIsDeleteModalOpen(false);
      onDelete(member.id);
    } catch (error) {
      console.error("Error deleting seller:", error);
      toast.error(`Failed to remove ${member.name} from sellers`);
    } finally {
      setIsDeleting(false);
    }
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
          disabled={member.type === "Owner" || isDeleting}
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