"use client";
import { ReactNode, CSSProperties } from "react";
import styles from "@/styles/layouts/TwoColumnLayout.module.css";

interface TwoColumnLayoutProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  leftWidth?: string;
  rightWidth?: string;
  gap?: string;
  containerStyle?: CSSProperties;
  className?: string;
}

export default function TwoColumnLayout({
  leftContent,
  rightContent,
  leftWidth = "20%",
  rightWidth = "80%",
  gap = "20px",
  containerStyle,
  className,
}: TwoColumnLayoutProps) {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{
        gridTemplateColumns: `${leftWidth} ${rightWidth}`,
        gap,
        ...containerStyle,
      }}
    >
      <div className={styles.column}>{leftContent}</div>
      <div className={styles.column}>{rightContent}</div>
    </div>
  );
}
