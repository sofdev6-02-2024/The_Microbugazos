"use client";

import React, { useEffect, useRef } from "react";
import "@/styles/SideMenu.css";
import { Option } from "@/components/Option";
import { LuHome, LuHistory, LuPiggyBank } from "react-icons/lu";
import { RiShoppingCart2Line, RiCursorLine, RiSofaLine } from "react-icons/ri";
import { BsBookmarkStar, BsHeartPulse } from "react-icons/bs";
import { GiDelicatePerfume } from "react-icons/gi";
import {
  MdFavoriteBorder,
  MdCheckroom,
  MdStorefront,
  MdOutlineCallEnd,
} from "react-icons/md";
import useAuth from "@/commons/hooks/useAuth";
import { UserType } from "@/types/auth";
import Loader from "@/components/Loader";

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
      <Option icon={MdStorefront} text={"Store"} completeRoute route={user?.userType === UserType.CLIENT ? "create-store" : "store"} />
    </div>
  );
};

export default SideMenu;
