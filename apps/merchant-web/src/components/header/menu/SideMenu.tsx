"use client";

import cartData from "@/shopping-cart-format-example.json";
import { useEffect, useRef } from "react";
import menuData from "@/assets/side-menu/options.json";
import { Options } from "./Options";
import "@/styles/header/menu/side-menu.css";
import "@/styles/SideMenu.css";
import { handleSubmitCart } from "@/services/checkoutService";
import { LuHome } from "react-icons/lu";
import { MdStorefront } from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import { UserType } from "@/types/auth";

interface Props {
  isOpen: boolean;
  toggleMenu: () => void;
}

const SideMenu = ({ isOpen, toggleMenu }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isOpen &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      toggleMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`side-menu ${isOpen ? "show" : ""}`} ref={menuRef}>
      {menuData &&
        menuData.length > 0 &&
        menuData.map((option) => {
          return (
            <Options
              key={option.name}
              name={option.name}
              options={option.options}
            />
          );
        })}
      {/* <div
      className={`side-menu side-menu-overlay ${isOpen ? "show" : ""}`}
      ref={menuRef}
    >
      <Option icon={LuHome} text={"Home"} />

      <p className="subtitle">From Merchant</p>
      <Option
        icon={MdStorefront}
        text={"Store"}
        completeRoute
        route={user?.userType === UserType.CLIENT ? "create-store" : "store"}
      />

      <Option
        icon={MdStorefront}
        text={"Store Catalog"}
        completeRoute
        route={"catalog/e9882e57-4b87-45de-8153-260653751e5b"}
      />*/}
    </div>
  );
};
