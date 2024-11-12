import { MdPerson } from "react-icons/md";
import '@/styles/header/user/UserButton.css'

interface Props {
  isLogged: boolean;
  toggleOpen: () => void;
}

export const UserButton = ({isLogged, toggleOpen}: Props) => {
  return (
    <button className="user-button" onClick={toggleOpen}>
      <MdPerson />
      <span className={`user-button-alert ${!isLogged ? 'alert' : ''}`}>!</span>
    </button>
  );
}