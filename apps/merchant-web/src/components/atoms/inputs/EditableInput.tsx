import React, { useEffect, useState } from "react";
import { SquarePen } from "lucide-react";
import styles from "@/styles/atoms/inputs/EditableInput.module.css";

interface InputData {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  icon?: React.ReactNode;
  error?: string;
  handleBlur?: (e: string) => void;
  touched?: boolean;
  isEditable?: boolean;
  isMarkedEditable?: boolean;
  preelement?: React.ReactNode;
}

export const EditableInput: React.FC<InputData> = ({
  type = "text",
  value = "",
  onChange = () => {},
  label = "Input Label",
  placeholder = "Enter text",
  id = "inputField",
  name = "inputField",
  icon = <SquarePen color="var(--primary-400)" />,
  error = "",
  handleBlur,
  touched = false,
  isEditable = false,
  isMarkedEditable = false,
  preelement,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!error && isMarkedEditable) {
      setIsEditing(true);
    }
  }, [isMarkedEditable]);

  useEffect(() => {
    if (error !== "") {
      setIsEditing(false);
    }
  }, [error]);

  const handleClickContact = () => {
    if (isEditing) return;
    handleBlur?.(name);
  };

  return (
    <div
      className={styles.inputGroup}
      onBlur={() => handleClickContact()}
      onClick={() => handleClickContact()}
    >
      <label
        htmlFor={id}
        className={`${styles.label}  ${touched && error && styles.error}  ${
          isEditing && styles.untouchable
        }`}
      >
        {label}
      </label>
      <div
        className={`${styles.inputWithIcon} ${
          touched && error && styles.containerError
        }`}
      >
        {preelement ? (
          preelement
        ) : (
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={(e) => {
              if (!isEditing) {
                onChange(e);
              }
            }}
            placeholder={placeholder}
            className={`${styles.input} ${isEditing && styles.untouchable}`}
          />
        )}

        {isEditable == true && isEditing && (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setIsEditing(!isEditing)}
          >
            {icon}
          </div>
        )}
      </div>
      {touched && <span className={styles.error}>{error}</span>}
    </div>
  );
};
