"use client"

import "@/styles/header/user/UserOptions.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface Props {
  isLogged: boolean;
  isOpen: boolean;
  logOut: () => void;
  toggleMenu: () => void;
}

export const UserOptions = ({ isLogged, isOpen, logOut, toggleMenu }: Props) => {
  const route = useRouter();
  const userRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isOpen &&
      userRef.current &&
      !userRef.current.contains(event.target as Node)
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
    <div className={`user-options ${isOpen ? "open" : ""}`} ref={userRef}>
      {isLogged ? (
        <>
          <button
            onClick={() => {
              route.push("/profile");
            }}
            className="user-options-option"
          >
            Profile
          </button>
          <button
            onClick={() => {
              route.push("/order-history");
            }}
            className="user-options-option"
          >
            Order History
          </button>
          <button className="user-options-option log-out" onClick={logOut}>
            Log out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => route.push("/login")}
            className="user-options-option"
          >
            Log in
          </button>
          <button
            onClick={() => route.push("/signup")}
            className="user-options-option"
          >
            Sign up
          </button>
        </>
      )}
    </div>
  );
};
