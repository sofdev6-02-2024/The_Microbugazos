import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import styles from "@/styles/members-store/modal-styles.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: 'delete' | 'add';
  memberName?: string;
}

const GeneralModal: React.FC<ModalProps> = ({
                                              isOpen,
                                              onClose,
                                              onConfirm,
                                              type,
                                              memberName
                                            }) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === 'add' && !email) return;
    onConfirm();
    onClose();
  };

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <button
          onClick={onClose}
          className={styles['modal-close-button']}
        >
          <IoClose size={24} />
        </button>

        {type === 'delete' && (
          <div className={styles['modal-body-delete']}>
            <h2 className={styles['modal-header']}>Confirm Deletion</h2>
            <p className={`${styles['modal-delete-text']} ${styles['modal-delete-name']}`}>
              Are you sure you want to remove
              <span> {memberName}</span> from sellers?
            </p>
          </div>
        )}

        {type === 'add' && (
          <div className={styles['modal-body-add']}>
            <h2 className={styles['modal-header']}>Add New Seller</h2>
            <input
              type="email"
              placeholder="Enter seller email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles['modal-input']}
            />
          </div>
        )}

        <div className={styles['modal-footer']}>
          <button
            onClick={onClose}
            className={styles['modal-cancel-button']}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`${styles['modal-confirm-button']} ${
              type === 'delete'
                ? styles['modal-confirm-button-delete']
                : styles['modal-confirm-button-add']
            }`}
          >
            {type === 'delete' ? 'Delete' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;