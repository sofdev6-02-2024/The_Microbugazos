import React from "react";
import SwitchStyle from "@/styles/Switch.module.css";

interface Props {
  value: boolean;
  toggleFunction: () => void;
  leftIcon?: React.ComponentType;
  rightIcon?: React.ComponentType;
}

export default function Switch({ value, toggleFunction, leftIcon: LeftIcon, rightIcon: RightIcon }: Readonly<Props>) {
  return (
    <div className={SwitchStyle.container}>
      <button
        className={`${SwitchStyle.button} ${value && SwitchStyle.selected}`}
        onClick={() => toggleFunction()}
      >
        {LeftIcon && <LeftIcon color={value ? "var(--white)" : "var(--primary-400)"} />}
      </button>
      <button
        className={`${SwitchStyle.button} ${!value && SwitchStyle.selected}`}
        onClick={() => toggleFunction()}
      >
        {RightIcon && <RightIcon color={!value ? "var(--white)" : "var(--primary-400)"} />}
      </button>
    </div>
  );
}
