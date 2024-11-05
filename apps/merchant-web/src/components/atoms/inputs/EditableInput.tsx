import React from "react";
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
}) => {
  return (
    <div className={styles.inputGroup} onBlur={() => handleBlur?.(name)} onClick={() => handleBlur?.(name)}>
      <label
        htmlFor={id}
        className={`${styles.label}  ${touched && error && styles.error}`}
      >
        {label}
      </label>
      <div
        className={`${styles.inputWithIcon} ${
          touched && error && styles.containerError
        }`}
      >
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
        />
        {icon}
      </div>
      {touched && <span className={styles.error}>{error}</span>}
    </div>
  );
};
