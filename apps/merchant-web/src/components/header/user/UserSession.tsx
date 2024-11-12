"use client";

import { useState } from "react";
import { UserButton } from "./UserButton";
import { UserOptions } from "./UserOptions";

export const UserSession = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <UserButton isLogged={false} toggleOpen={toggleOpen} />
      <UserOptions isLogged={false} isOpen={isOpen} />
    </>
  );
};
