"use client";

import React from "react";

interface FormInputProps {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  warning?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, id, name, type, value, onChange, warning, required }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
    {warning && <p className="error-message">{warning}</p>}
  </div>
);

export default FormInput;
