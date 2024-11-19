"use client";

import React from "react";

interface FormTextareaProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  warning?: string;
  required?: boolean;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ label, id, name, value, onChange, warning, required }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    ></textarea>
    {warning && <p className="error-message">{warning}</p>}
  </div>
);

export default FormTextarea;
