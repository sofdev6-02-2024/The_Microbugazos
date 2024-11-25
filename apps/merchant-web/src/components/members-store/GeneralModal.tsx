import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import styles from "@/styles/members-store/modal-styles.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string) => void;
  type: "delete" | "add";
  memberName?: string;
  suffix?: string;
}

const GeneralModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  memberName,
  suffix = "from sellers",
}) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === "add" && !email) return;
    onConfirm(email);
    setEmail("");
  };

  const handleClose = () => {
    setEmail("");
    onClose();
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <button onClick={onClose} className={styles["modal-close-button"]}>
          <IoClose size={24} />
        </button>

        {type === "delete" && (
          <div className={styles["modal-body-delete"]}>
            <h2 className={styles["modal-header"]}>Confirm Deletion</h2>
            <p
              className={`${styles["modal-delete-text"]} ${styles["modal-delete-name"]}`}
            >
              Are you sure you want to remove
              <span> {memberName}</span> {suffix}?
            </p>
          </div>
        )}

        {type === "add" && (
          <div className={styles["modal-body-add"]}>
            <h2 className={styles["modal-header"]}>Add New Seller</h2>
            <input
              type="email"
              placeholder="Enter seller email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles["modal-input"]}
            />
          </div>
        )}

        <div className={styles["modal-footer"]}>
          <button
            onClick={handleClose}
            className={styles["modal-cancel-button"]}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`${styles["modal-confirm-button"]} ${
              type === "delete"
                ? styles["modal-confirm-button-delete"]
                : styles["modal-confirm-button-add"]
            }`}
          >
            {type === "delete" ? "Delete" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
