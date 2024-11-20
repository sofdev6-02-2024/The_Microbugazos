import React from "react";
import styles from "@/styles/Option.module.css";
import { useRouter } from "next/navigation";

interface FormInputProps {
  icon: React.ElementType;
  text: string;
  route?: string;
  completeRoute?: boolean;
  onRouteChange?: (route: string) => void;
}

export const Option: React.FC<FormInputProps> = ({
  icon: Icon,
  text,
  route = "",
  completeRoute = false,
  onRouteChange = (route: string) => {},
}) => {
  const router = useRouter();

  const handleRouterNavigation = () => {
    const formattedText = text.toLowerCase().replace(/\s/g, "-");
    if (completeRoute) {
      onRouteChange(`/${route}`);
      router.push(`/${route}`);
      return;
    }
    if (formattedText !== "home") {
      if (route) {
        router.push(`/${route}/${formattedText}`);
        onRouteChange(`/${route}/${formattedText}`);
      } else {
        router.push(`/${formattedText}`);
      }
    } else {
      router.push("/");
    }
  };
  return (
    <div className={styles.container} onClick={handleRouterNavigation}>
      <Icon className={styles.icon} />
      <p>{text}</p>
    </div>
  );
};
