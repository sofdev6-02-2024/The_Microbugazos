"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Option } from "./Option";
import "@/styles/general/Select.css";

interface Props {
  values: Array<string>;
  handleOption: (value: string) => void;
}

export const Select = ({ values, handleOption }: Props) => {
  const [value, setValue] = useState("Select an option");
  const [isOpen, setIsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  const toggleOpen = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setValue(option);
    setIsOpen(false);
    handleOption(option);
  };

  const handleClickOutside = (event: Event) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="select-section">
      <button onClick={toggleOpen} className="select-button">
        {value}
        {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </button>
      {isOpen && (
        <div className="select-options" ref={optionsRef}>
          {values.map((option, index) => (
            <Option
              key={option + index}
              label={option}
              isSelected={value === option}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};
