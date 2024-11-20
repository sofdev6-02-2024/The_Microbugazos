import { MdMenu } from "react-icons/md";
import '@/styles/header/menu/MenuButton.css'

interface Props {
  toggleOpen: () => void;
}

export const MenuButton = ({toggleOpen}: Props) => {
  return (
    <button className="menu-button" onClick={toggleOpen}>
      <MdMenu />
    </button>
  );
}