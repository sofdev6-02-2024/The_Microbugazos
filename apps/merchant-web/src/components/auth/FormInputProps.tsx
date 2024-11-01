import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from '../../styles/auth/FormInput.module.css';

interface FormInputProps {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  label,
  error,
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    if (required && !value.trim()) {
      onChange({
        ...e,
        target: {
          ...e.target,
          value: e.target.value,
          id,
        },
      });
    }
  };

  const showError = touched && required && !value.trim() ? `${label} is required` : error;

  return (
    <div className={styles.inputGroup}>
      <input
        type={inputType}
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e);
          if (touched) setTouched(true);
        }}
        onBlur={handleBlur}
        className={`${styles.input} ${showError ? styles.errorInput : ''}`}
        required={required}
      />
      <label htmlFor={id} className={styles.placeholder}>
        {label}{required ? ' *' : ''}
      </label>
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={styles.eyeButton}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
      {showError && (
        <div className={styles.errorMessage}>
          {showError}
        </div>
      )}
    </div>
  );
};
