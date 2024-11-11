import Image from "next/image";
import logo from "@/app/assets/logo/S.png";
import '@/styles/header/header.css';
import { SearchBar } from "./header/searchbar/searchbar";
import { ShoppingCart } from "./header/shopping-cart/shoppingCart";

interface Props {
  isRegistered: boolean;
}

export function Header({ isRegistered }: Readonly<Props>) {
  return (
    <header className="header">
      <Image src={logo} alt="Merchant logo" draggable={false} />
      <SearchBar />
      <ShoppingCart />
    </header>
  );
}
