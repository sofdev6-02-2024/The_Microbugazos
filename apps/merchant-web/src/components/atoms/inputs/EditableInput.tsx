import React, { useEffect, useRef, useState } from "react";
import { SquarePen } from "lucide-react";
import styles from "@/styles/atoms/inputs/editable-input.module.css";

interface InputData {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  multiline?: boolean;
  rows?: number;
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
                                                     multiline = false,
                                                     rows = 4,
                                                   }) => {
  const [isEditing, setIsEditing] = useState(false);
  const isMarkedEditableInput = useRef(isMarkedEditable);

  useEffect(() => {
    if (isMarkedEditableInput.current) {
      setIsEditing(true);
    }
    if (error !== "" && isMarkedEditable) {
      setIsEditing(true);
    }
  }, [isMarkedEditable]);

  useEffect(() => {
    if (error !== "") {
      setIsEditing(false);
    }
  }, [error, isEditing]);

  const handleClickContact = () => {
    if (isEditing) return;
    handleBlur?.(name);
  };

  const renderInput = () => {
    if (preelement) {
      return (
        <div
          className={`${isEditing && styles.untouchable}`}
          style={{ width: "100%" }}
        >
          {preelement}
        </div>
      );
    }

    if (multiline) {
      return (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={(e) => {
            if (!isEditing) {
              onChange(e);
            }
          }}
          placeholder={placeholder}
          className={`${styles.input} ${isEditing && styles.untouchable} ${styles.textarea}`}
          rows={rows}
        />
      );
    }

    return (
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
    );
  };

  return (
    <div
      className={styles.inputGroup}
      onBlur={() => handleClickContact()}
      onClick={() => handleClickContact()}
    >
      <label
        htmlFor={id}
        className={`${styles.label} ${touched && error && styles.error} ${
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
        {renderInput()}
        {isEditable && isEditing && error === "" && (
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