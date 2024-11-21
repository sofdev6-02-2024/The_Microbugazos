import "@/styles/atoms/buttons/buttons.css";
interface ButtonProps {
  type?: "button" | "submit";
  disabled?: boolean;
  buttonStyle?: "primary" | "secundary";
  children?: React.ReactNode;
}

export const Button = ({
  type = "button",
  disabled = false,
  buttonStyle = "primary",
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`button ${disabled ? "disabled" : ""} ${buttonStyle}`}
    >
      {children}
    </button>
  );
};
