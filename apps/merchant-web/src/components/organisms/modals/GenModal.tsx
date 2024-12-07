import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import styles from "@/styles/members-store/modal-styles.module.css";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "delete" | "add" | "apply";
  children?: React.ReactNode;
}

const GenModal = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <button onClick={onClose} className={styles["modal-close-button"]}>
          <IoClose size={24} />
        </button>
        {children}
        <div className={styles["modal-footer"]}>
          <button onClick={onClose} className={styles["modal-cancel-button"]}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`${styles["modal-confirm-button"]} ${
              type === "delete"
                ? styles["modal-confirm-button-delete"]
                : styles["modal-confirm-button-add"]
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenModal;
