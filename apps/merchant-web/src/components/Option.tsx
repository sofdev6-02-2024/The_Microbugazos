import React from "react";
import styles from "@/styles/Option.module.css"
import {useRouter} from "next/navigation";

interface FormInputProps {
    icon: React.ElementType;
    text: string;
    route?: string;
  onClick?: () => void;
}

export const Option: React.FC<FormInputProps> = ({icon: Icon, text, route = '', onClick }) => {
    const router = useRouter();

    const handleRouterNavigation = () => {
        const formattedText = text.toLowerCase().replace(/\s/g, '-');
        if (formattedText !== "home") {
            if (route) {
                router.push(`/${route}/${formattedText}`);
            } else {
                router.push(`/${formattedText}`);
            }
        } else {
            router.push('/');
        }
    };

    const handleClick = () => {
      if (onClick) {
        onClick();
      } else {
        handleRouterNavigation();
      }
    };
    return (
        <div className={styles.container} onClick={handleClick}>
            <Icon className={styles.icon} />
            <p>{text}</p>
        </div>
    );
};
