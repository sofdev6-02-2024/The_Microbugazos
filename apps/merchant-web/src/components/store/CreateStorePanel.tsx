import styles from "@/styles/store/CreateStorePanel.module.css";

interface CreateStorePanelProps {
  onSubmit: () => void;
  onCancel: () => void;
  clicked: boolean;
}

export const CreateStorePanel: React.FC<CreateStorePanelProps> = ({
  onSubmit,
  onCancel,
  clicked = false,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1>Create Store</h1>
        <p>
          By creating a store, you will be able to effectively manage and
          showcase your products or services. Set up your inventory, customize
          the look of your store, and establish payment methods, all in one
          place. Start selling and reach more customers quickly and easily.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${styles.cancelButton}`}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          disabled={clicked}
          type="submit"
          className={`${styles.button} ${styles.createButton} ${
            clicked && styles.disabledButton
          }`}
          onClick={onSubmit}
        >
          Create Store
        </button>
      </div>
    </div>
  );
};
