"use client";

import {useState} from "react";
import TextFieldStyle from "../styles/components/TextField.module.css"
import {SquarePen} from "lucide-react";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  errors: [{textField: string, error: string}];
  setErrors: (value: [{textField: string, error: string}]) => void;
  value: string;
  onChange: (value: string) => void;
  validator: (value: string) => {isValid: boolean, errorMessage?: string};
  onKeyDown?: (event) => void;
  type?: 'text' | 'password' | 'email' | 'number';
  showIcon?: boolean;
  required?: boolean;
}

const TextField = ({
    label,
    placeholder,
    errors,
    setErrors,
    value,
    onChange,
    onKeyDown,
    validator = (string) => {
        return {
            isValid: true,
            errorMessage: null
        }
    },
    type = 'text',
    showIcon = true,
    required = false,
  }: TextFieldProps) => {
    const [currentErrorMessage, setCurrentErrorMessage] = useState("");
    return  (
        <div style={{ marginBottom: '8px', width: '100%' }}>
            {label && <label className={TextFieldStyle.formLabel} style={{ display: 'block', marginBottom: '4px'}}>
                {label}{required && <sup>*</sup>}
            </label>}
            <div style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        const result = validator(e.target.value);
                        if (!result.isValid) {
                            setCurrentErrorMessage(result.errorMessage ?? "Error");
                            const newErrors
                                = [...errors, {textField: label ?? "undefined", error: result.errorMessage ?? "Error"}];
                            setErrors(newErrors);
                        } else {
                            setCurrentErrorMessage(null);
                            const newErrors
                                = errors.filter((item) => item.textField != label);
                            setErrors(newErrors);
                        }
                        onChange(e.target.value)
                    }}
                    onKeyDown={onKeyDown}
                    className={TextFieldStyle.textField}
                    style={{
                        width: '100%',
                    }}
                />
                {showIcon && <SquarePen
                    color="var(--primary-400)"
                    style={{
                        position: 'absolute',
                        right: '15px',
                    }}
                />}
            </div>
            {currentErrorMessage && <label style={{fontSize: "14px", color: "#FB5012"}}>{currentErrorMessage}</label>}
        </div>
      );
    };

export default TextField;

