import { MdMenu } from "react-icons/md";
import '@/styles/header/menu/menu-button.css'

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
