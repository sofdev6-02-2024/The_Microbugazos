import { MdCheck } from "react-icons/md";
import '@/styles/general/option.css'

interface Props {
  label: string;
  isSelected: boolean;
  handleSelect: (option: string) => void;
}

export const Option = ({ label, isSelected, handleSelect }: Props) => {
  return (
    <button
      className={`option-section ${isSelected ? "selected" : ""}`}
      onClick={() => handleSelect(label)}
    >
      <span className="option-label">{label}</span>
      {isSelected && <MdCheck className="option-checkmark" />}
    </button>
  );
};
