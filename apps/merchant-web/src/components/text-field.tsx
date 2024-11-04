"use client";

import {MdEdit} from "react-icons/md";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (event) => void;
  type?: 'text' | 'password' | 'email' | 'number';
  showIcon?: boolean;
}

const TextField = ({
    label,
    placeholder,
    value,
    onChange,
    onKeyDown,
    type = 'text',
    showIcon = true,
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
                    onKeyDown={onKeyDown}
                    className="text-field"
                    style={{
                        width: '100%',
                    }}
                />
                {showIcon && <MdEdit
                    style={{
                        position: 'absolute',
                        right: '35px',
                        backgroundColor: '#F4F9FF',
                    }}
                />}
            </div>
        </div>
      );
    };

export default TextField;

