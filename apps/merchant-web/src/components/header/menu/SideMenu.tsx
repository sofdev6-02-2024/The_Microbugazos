"use client";

import React, { useEffect, useRef } from "react";
import menuData from "@/assets/side-menu/options.json";
import { Options } from "./Options";
import "@/styles/header/menu/side-menu.css";

interface Props {
  isOpen: boolean;
  toggleMenu: () => void;
}

const SideMenu = ({ isOpen, toggleMenu }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

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
      {menuData && menuData.length > 0 ? (
        menuData.map((option) => {
          return (
            <Options
              key={option.name}
              name={option.name}
              options={option.options}
            />
          );
        })
      ) : (
        <div className="side-menu-empty">No menu options available</div>
      )}
    </div>
  );
};

export default SideMenu;
