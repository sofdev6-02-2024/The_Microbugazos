import { useState } from "react";
import { SquarePen } from "lucide-react";
import styles from "@/styles/components/combo-box.module.css";

interface Props {
  options: Array<{ id: string; name: string }>;
  value: string;
  handleChange: (value: string) => void;
}

export default function ComboBox({
  options,
  value,
  handleChange,
}: Readonly<Props>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.comboBox}>
      <div
        className={styles.comboBoxSelected}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{value || "Select an option"}</div>
        <SquarePen color="var(--primary-400)" />
      </div>
      {isOpen && (
        <div className={styles.comboBoxOptions}>
          {options.map((option) => (
            <div
              key={option.id}
              className={styles.comboBoxOption}
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
