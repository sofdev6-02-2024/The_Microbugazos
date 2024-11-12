"use client";

import { useState } from "react";
import { MenuButton } from "./MenuButton";
import SideMenu from "@/components/SideMenu";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuButton toggleOpen={toggleMenu} />
      <SideMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  );
};
