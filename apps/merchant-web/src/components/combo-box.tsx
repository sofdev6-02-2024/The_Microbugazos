import { useState } from "react";
import {MdEdit} from "react-icons/md";

interface ComboBoxProps {
    options: Array<{id: string, name: string}>,
    value: string,
    handleChange: (value: string) => void
}

export default function ComboBox({options, value, handleChange}: ComboBoxProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="combo-box">
          <div className="combo-box-selected" onClick={() => setIsOpen(!isOpen)}>
            <div>
                {value || "Select an option"}
            </div>
            <MdEdit style={{backgroundColor: '#F4F9FF'}}/>
          </div>
          {isOpen && (
            <div className="combo-box-options">
              {options.map((option) => (
                <div
                  key={option.id}
                  className="combo-box-option"
                  onClick={() => {
                    handleChange(option.name);
                    setIsOpen(false);
                    }}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>
    );
  }