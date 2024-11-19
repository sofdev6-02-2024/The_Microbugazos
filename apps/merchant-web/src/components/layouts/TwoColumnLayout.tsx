"use client";
import { ReactNode, CSSProperties } from "react";
import styles from "@/styles/layouts/two-column-layout.module.css";

interface TwoColumnLayoutProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  leftWidth?: string;
  rightWidth?: string;
  gap?: string;
  containerStyle?: CSSProperties;
}

export default function TwoColumnLayout({
  leftContent,
  rightContent,
  leftWidth = "20%",
  rightWidth = "80%",
  gap = "20px",
  containerStyle,
}: TwoColumnLayoutProps) {
  return (
    <div
      className={styles.container}
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
