"use client";

import React, { useEffect, useRef } from "react";
import "@/styles/SideMenu.css";
import { Option } from "@/components/Option";
import { BiHomeAlt } from "react-icons/bi";
import { MdStorefront } from "react-icons/md";
import { GrContact, GrCatalog } from "react-icons/gr";
import { UserType } from "@/types/auth";
import { LuHeart } from "react-icons/lu";
import { useAuth } from "@/commons/context/AuthContext";

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
      <Option
        icon={BiHomeAlt}
        text={"Home"}
      />

      <Option
        icon={LuHeart}
        text={"Favorites"}
        completeRoute
        route= "favorites"
      />

      <p className="subtitle">From Merchant</p>
      <Option
        icon={MdStorefront}
        text={"Store"}
        completeRoute
        route={user?.userType === UserType.CLIENT ? "create-store" : "store"}
      />

      <Option
        icon={GrCatalog}
        text={"Store Catalog"}
        completeRoute
        route={"catalog/14c72984-0670-4bed-a0dc-041beec5d2f2"}
      />

      <Option
        icon={GrContact}
        text={"Contact Us"}
        completeRoute
        route="contact-us"
      />
    </div>
  );
};

export default SideMenu;
