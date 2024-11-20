"use client";

import { LuHome } from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { TbUsers } from "react-icons/tb";
import "@/styles/store/store-admin-menu.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface OptionProps {
  activeOption: string;
  setActiveOption: (option: string) => void;
}

export const StoreMobileMenu = ({
  activeOption,
  setActiveOption,
}: OptionProps) => {
  const paths = [
    "/stores",
    "/stores/store",
    "/stores/inventory",
    "/stores/members",
  ];

  const [activeIndex, setActiveIndex] = useState(
    paths.findIndex((path) => path === activeOption)
  );

  const router = useRouter();

  const activeOpt = "mobile-store-admin-menu-border-icon";

  const handleRouterNavigation = (optionIndex: number) => {
    const path = paths[optionIndex];
    router.push(path);
    setActiveIndex(optionIndex);
    setActiveOption(path);
  };

  useEffect(() => {
    setActiveIndex(paths.findIndex((path) => path === activeOption));
  }, [activeOption]);

  return (
    <ul className="mobile-store-admin-menu">
      <li className={`${activeIndex === 0 ? activeOpt : ""}`}>
        <LuHome onClick={() => handleRouterNavigation(0)} />
      </li>
      <li className={`${activeIndex === 1 ? activeOpt : ""}`}>
        <MdOutlineInventory2 onClick={() => handleRouterNavigation(1)} />
      </li>
      <li className={`${activeIndex === 2 ? activeOpt : ""}`}>
        <RiShoppingCart2Line onClick={() => handleRouterNavigation(2)} />
      </li>
      <li className={`${activeIndex === 3 ? activeOpt : ""}`}>
        <TbUsers onClick={() => handleRouterNavigation(3)} />
      </li>
    </ul>
  );
};
