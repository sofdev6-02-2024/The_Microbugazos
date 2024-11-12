"use client";

import { useState } from "react";
import { UserButton } from "./UserButton";
import { UserOptions } from "./UserOptions";
import useAuth from "@/hooks/useAuth";
import useNavigate from "@/commons/hooks/UseNavigate";

interface Props {
  isLogged: boolean;
}

export const UserSession = ({ isLogged }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOutHandle } = useAuth();
  const navigate = useNavigate();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const logOut = () => {
    signOutHandle();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <>
      <UserButton isLogged={isLogged} toggleOpen={toggleOpen} />
      <UserOptions isLogged={isLogged} isOpen={isOpen} logOut={logOut} />
    </>
  );
};
