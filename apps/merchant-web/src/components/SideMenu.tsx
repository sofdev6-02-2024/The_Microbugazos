import React from "react";
import styles from "@/styles/SideMenu.module.css"
import {Option} from "@/components/Option";
import { LuHome } from "react-icons/lu";
import { MdStorefront } from "react-icons/md";

const SideMenu = () => {
    return (
        <div className={styles.sideMenu}>
            <Option icon={LuHome} text={"Home"}/>
            <p className={styles.subtitle}>Products</p>

            <p className={styles.subtitle}>From Merchant</p>
            <Option icon={MdStorefront} text={"Create Store"}/>
        </div>
    );
};

export default SideMenu;