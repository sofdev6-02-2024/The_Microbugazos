"use client";

import cartData from "@/shopping-cart-format-example.json";
import React, { useEffect, useRef } from "react";
import "@/styles/SideMenu.css";
import { Option } from "@/components/Option";
import { handleSubmitCart } from "@/services/checkoutService";
import { LuHome } from "react-icons/lu";
import { MdStorefront } from "react-icons/md";
import useAuth from "@/commons/hooks/useAuth";
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
    <div
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
        text={"Go to Checkout"}
        onClick={() => handleSubmitCart(cartData)}
      />
    </div>
  );
};

export default SideMenu;
