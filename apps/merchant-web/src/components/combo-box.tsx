import { useState } from "react";
import {SquarePen} from "lucide-react";
import ComboBoxStyle from "../styles/components/ComboBox.module.css"

interface ComboBoxProps {
    options: Array<{id: string, name: string}>,
    value: string,
    handleChange: (value: string) => void,
    placeholder?: string,
}

export default function ComboBox({options, value, handleChange, placeholder = "Select an option"}: ComboBoxProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={ComboBoxStyle.comboBox}>
          <div className={ComboBoxStyle.comboBoxSelected} onClick={() => setIsOpen(!isOpen)}>
            <div>
                {value || placeholder}
            </div>
            <SquarePen color="var(--primary-400)"/>
          </div>
          {isOpen && (
            <div className={ComboBoxStyle.comboBoxOptions}>
              {options && options.map((option) => (
                <div
                  key={option.id}
                  className={ComboBoxStyle.comboBoxOption}
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