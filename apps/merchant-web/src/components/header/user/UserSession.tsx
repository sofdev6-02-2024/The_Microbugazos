"use client";

import { useState } from "react";
import { UserButton } from "./UserButton";
import { UserOptions } from "./UserOptions";

interface Props {
  isLogged: boolean;
}

export const UserSession = ({isLogged}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <UserButton isLogged={isLogged} toggleOpen={toggleOpen} />
      <UserOptions isLogged={isLogged} isOpen={isOpen} />
    </>
  );
};
