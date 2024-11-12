import React from "react";
import styles from "@/styles/SideMenu.module.css"
import {Option} from "@/components/Option";
import { LuHome } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { LuHistory } from "react-icons/lu";
import { BsBookmarkStar } from "react-icons/bs";
import { LuPiggyBank } from "react-icons/lu";
import { RiCursorLine } from "react-icons/ri";
import { MdCheckroom } from "react-icons/md";
import { GiDelicatePerfume } from "react-icons/gi";
import { RiSofaLine } from "react-icons/ri";
import { BsHeartPulse } from "react-icons/bs";
import { MdStorefront } from "react-icons/md";
import { MdOutlineCallEnd } from "react-icons/md";

const SideMenu = () => {
    return (
        <div className={styles.sideMenu}>
            <Option icon={LuHome} text={"Home"}/>
            <Option icon={MdFavoriteBorder} text={"Favorites"}/>
            <Option icon={RiShoppingCart2Line} text={"Cart"}/>
            <Option icon={LuHistory} text={"History"}/>
            <p className={styles.subtitle}>Products</p>
            <Option icon={BsBookmarkStar} text={"Best Seller"} route={"products"}/>
            <Option icon={LuPiggyBank} text={"Offers"} route={"products"}/>
            <Option icon={RiCursorLine} text={"Electronics"} route={"products"}/>
            <Option icon={MdCheckroom} text={"Clothing & Fashion"} route={"products"}/>
            <Option icon={GiDelicatePerfume} text={"Beauty & Personal Care"} route={"products"}/>
            <Option icon={RiSofaLine} text={"Home & Kitchen"} route={"products"}/>
            <Option icon={BsHeartPulse} text={"Health & Wellness"} route={"products"}/>
            <p className={styles.subtitle}>From Merchant</p>
            <Option icon={MdStorefront} text={"Store"}/>
            <Option icon={MdOutlineCallEnd} text={"About Us"}/>
        </div>
    );
};

export default SideMenu;