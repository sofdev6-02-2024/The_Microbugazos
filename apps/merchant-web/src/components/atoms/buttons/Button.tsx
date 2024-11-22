import "@/styles/atoms/buttons/buttons.css";
import { CSSProperties, MouseEvent } from "react";
interface ButtonProps {
  type?: "button" | "submit";
  disabled?: boolean;
  buttonStyle?: "primary" | "secundary" | "button-delete" | "button-free";
  variant?: "button-variant-small" | "button-variant-default";
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export const Button = ({
  type = "button",
  disabled = false,
  buttonStyle = "primary",
  variant = "button-variant-default",
  handleClick = () => {},
  style = {},
  children,
}: ButtonProps) => {
  return (
    <button
      style={style}
      type={type}
      disabled={disabled}
      className={`button button-style ${
        disabled ? "disabled" : ""
      } ${buttonStyle} ${variant}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
