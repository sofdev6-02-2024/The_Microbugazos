import Image from "next/image";
import logo from "@/app/assets/logo/S.png";
import "@/styles/header/header.css";
import { SearchBar } from "./header/searchbar/searchbar";
import { ShoppingCart } from "./header/shopping-cart/shoppingCart";
import { UserSession } from "./header/user/UserSession";
import { Menu } from "@/components/header/menu/Menu";

interface Props {
  isRegistered: boolean;
}

export function Header({ isRegistered }: Readonly<Props>) {
  return (
    <header className="header">
      <div className="first-section-header">
        <Menu />
        <Image src={logo} alt="Merchant logo" draggable={false} />
      </div>
      <SearchBar />
      <div className="header-actions">
        <ShoppingCart />
        <UserSession />
      </div>
    </header>
  );
}
