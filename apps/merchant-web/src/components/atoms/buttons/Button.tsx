import { CSSProperties, MouseEvent } from "react";
import "@/styles/atoms/buttons/buttons.css";
interface ButtonProps {
  type?: "button" | "submit";
  disabled?: boolean;
  buttonStyle?: "primary" | "secundary" | "button-delete" | "button-free";
  variant?: "button-variant-small" | "button-variant-default";
  className?: string;
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export const Button = ({
  type = "button",
  disabled = false,
  buttonStyle = "primary",
  variant = "button-variant-default",
  className = "",
  handleClick = () => {},
  style = {},
  children,
}: ButtonProps) => {
  return (
    <button
      style={style}
      type={type}
      disabled={disabled}
      className={`button button-style  ${className} ${
        disabled ? "disabled" : ""
      } ${buttonStyle} ${variant}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
