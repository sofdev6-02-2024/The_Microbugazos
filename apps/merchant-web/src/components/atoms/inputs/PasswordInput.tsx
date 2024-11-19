import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { EditableInput } from "@/components/atoms/inputs/EditableInput";
import styles from "@/styles/atoms/inputs/password-input.module.css";

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
  touched?: boolean;
  isEditable?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.passwordContainer}>
      <EditableInput
        {...props}
        type={showPassword ? "text" : "password"}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className={styles.toggleButton}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className={styles.eyeIcon} size={20} />
        ) : (
          <Eye className={styles.eyeIcon} size={20} />
        )}
      </button>
    </div>
  );
};