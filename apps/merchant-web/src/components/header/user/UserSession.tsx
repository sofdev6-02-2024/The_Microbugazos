"use client";

import { useState } from "react";
import { UserButton } from "./UserButton";
import { UserOptions } from "./UserOptions";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface Props {
  isLogged: boolean;
}

export const UserSession = ({ isLogged }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOutHandle } = useAuth();
  const router = useRouter();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const logOut = () => {
    signOutHandle();
    router.push("/");
    setIsOpen(false);
  };

  return (
    <>
      <UserButton isLogged={isLogged} toggleOpen={toggleOpen} />
      <UserOptions
        isLogged={isLogged}
        isOpen={isOpen}
        logOut={logOut}
        toggleMenu={toggleOpen}
      />
    </>
  );
};
