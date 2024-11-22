import React from "react";
import "@/styles/SideMenu.css";
import { Option } from "@/components/Option";
import { LuHome } from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { TbUsers } from "react-icons/tb";
import "@/styles/store/store-admin-menu.css";

interface StoreAdminSideMenuProps {
  onRouteChange: (route: string) => void;
}
export const StoreAdminSideMenu = ({
  onRouteChange,
}: StoreAdminSideMenuProps) => {
  return (
    <div className={`side-menu desktop-store-admin-menu`}>
      <Option
        icon={LuHome}
        text={"Home"}
        route="store"
        completeRoute={true}
        onRouteChange={onRouteChange}
        pushing={false}
      />
      <Option
        icon={MdOutlineInventory2}
        text={"Admin Store"}
        route="store"
        onRouteChange={onRouteChange}
        pushing={false}
      />
      <Option
        icon={RiShoppingCart2Line}
        text={"Inventory"}
        route="store"
        onRouteChange={onRouteChange}
        pushing={false}
      />
      <Option
        icon={TbUsers}
        text={"Members"}
        route="store"
        onRouteChange={onRouteChange}
        pushing={false}
      />
    </div>
  );
};
