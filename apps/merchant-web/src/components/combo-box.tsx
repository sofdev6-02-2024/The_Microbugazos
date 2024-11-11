import { useState } from "react";
import {MdEdit} from "react-icons/md";
import ComboBoxStyle from "../styles/components/ComboBox.module.css"

interface ComboBoxProps {
    options: Array<{id: string, name: string}>,
    value: string,
    handleChange: (value: string) => void
}

export default function ComboBox({options, value, handleChange}: ComboBoxProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={ComboBoxStyle.comboBox}>
          <div className={ComboBoxStyle.comboBoxSelected} onClick={() => setIsOpen(!isOpen)}>
            <div>
                {value || "Select an option"}
            </div>
            <MdEdit style={{backgroundColor: '#F4F9FF'}}/>
          </div>
          {isOpen && (
            <div className={ComboBoxStyle.comboBoxOptions}>
              {options.map((option) => (
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