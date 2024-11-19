import React from "react";
import styles from "@/styles/SideMenu.module.css";
import { Option } from "@/components/Option";
import { LuHome } from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { TbUsers } from "react-icons/tb";

export const StoreAdminSideMenu = () => {
  return (
    <div className={styles.sideMenu} style={{ paddingTop: "25px",height: "100%"}}>
      <Option
        icon={LuHome}
        text={"Home"}
        route="stores/"
        completeRoute={true}
      />
      <Option icon={MdOutlineInventory2} text={"Store"} route="stores/" />
      <Option icon={RiShoppingCart2Line} text={"Inventory"} route="stores/" />
      <Option icon={TbUsers} text={"Members"} route="stores/" />
    </div>
  );
};
