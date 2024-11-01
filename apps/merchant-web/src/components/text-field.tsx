"use client";

import {MdEdit} from "react-icons/md";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'password' | 'email';  // Add other types if needed
}

const TextField = ({
    label,
    placeholder,
    value,
    onChange,
    type = 'text'
  }: TextFieldProps) => {
    return  (
        <div style={{ marginBottom: '16px', width: '100%' }}>
          {label && <label className="form-label" style={{ display: 'block', marginBottom: '4px'}}>{label}</label>}
            <div style={{display: 'flex', alignItems: 'center'}}>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="text-field"
                    style={{
                        width: '100%',
                        paddingRight: '32px', // Espacio para el ícono
                    }}
                />
                <MdEdit
                    style={{
                        position: 'absolute',
                        right: '35px',
                        backgroundColor: '#F4F9FF',
                    }}
                />
            </div>
        </div>
      );
    };

export default TextField;

