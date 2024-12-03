import { CSSProperties, MouseEvent } from "react";
import "@/styles/atoms/buttons/buttons.css";
interface ButtonProps {
  type?: "button" | "submit";
  shape?: "squared" | "circle";
  disabled?: boolean;
  buttonStyle?: "primary" | "secundary" | "button-delete" | "button-free" | "button-filled";
  variant?: "button-variant-small" | "button-variant-default";
  handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export const Button = ({
  type = "button",
  shape = "circle",
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
      className={`button button-style ${shape} ${
        disabled ? "disabled" : ""
      } ${buttonStyle} ${variant}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
