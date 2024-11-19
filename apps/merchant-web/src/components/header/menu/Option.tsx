"use client"

import { ElementType, useEffect, useState } from "react";
import styles from "@/styles/header/menu/option.module.css";
import Link from "next/link";

interface Props {
  icon: ElementType;
  text: string;
  route?: string;
}

export const Option = ({ icon: Icon, text, route = "" }: Props) => {
  const [link, setLink] = useState("");

  const handleRouterNavigation = () => {
    const formattedText = text.toLowerCase().replace(/\s/g, "-");
    if (formattedText !== "home") {
      if (route) {
        setLink(`/${route}/${formattedText}`);
      } else {
        setLink(`/${formattedText}`);
      }
    } else {
      setLink("/");
    }
  };

  useEffect(() => {
    handleRouterNavigation();
  }, [text]);

  return (
    <Link className={styles.container} href={link}>
      <Icon className={styles.icon} />
      <p>{text}</p>
    </Link>
  );
};
