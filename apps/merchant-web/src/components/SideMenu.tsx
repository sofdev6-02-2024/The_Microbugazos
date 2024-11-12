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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`side-menu ${isOpen ? 'show' : ''}`} ref={menuRef}>
      <Option icon={LuHome} text={"Home"} />
      <Option icon={MdFavoriteBorder} text={"Favorites"} />
      <Option icon={RiShoppingCart2Line} text={"Cart"} />
      <Option icon={LuHistory} text={"History"} />
      <p className="subtitle">Products</p>
      <Option icon={BsBookmarkStar} text={"Best Seller"} route={"products"} />
      <Option icon={LuPiggyBank} text={"Offers"} route={"products"} />
      <Option icon={RiCursorLine} text={"Electronics"} route={"products"} />
      <Option
        icon={MdCheckroom}
        text={"Clothing & Fashion"}
        route={"products"}
      />
      <Option
        icon={GiDelicatePerfume}
        text={"Beauty & Personal Care"}
        route={"products"}
      />
      <Option icon={RiSofaLine} text={"Home & Kitchen"} route={"products"} />
      <Option
        icon={BsHeartPulse}
        text={"Health & Wellness"}
        route={"products"}
      />
      <p className="subtitle">From Merchant</p>
      <Option icon={MdStorefront} text={"Store"} />
      <Option icon={MdOutlineCallEnd} text={"About Us"} />
    </div>
  );
};

export default SideMenu;
