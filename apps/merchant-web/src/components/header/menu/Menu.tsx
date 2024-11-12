"use client";

import { useState } from "react";
import { MenuButton } from "./MenuButton";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuButton toggleOpen={toggleMenu} />
    </>
  );
};
