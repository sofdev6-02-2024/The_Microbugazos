"use client";
import { ReactNode, CSSProperties } from "react";
import "@/styles/layouts/TwoColumnLayout.css";

interface TwoColumnLayoutProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  leftWidth?: string;
  rightWidth?: string;
  gap?: string;
  containerStyle?: CSSProperties;
  className?: string;
  type?: "two-column-mobile" | "two-column-default";
}

export default function TwoColumnLayout({
  leftContent,
  rightContent,
  leftWidth = "20%",
  rightWidth = "80%",
  gap = "20px",
  containerStyle,
  className,
  type = "two-column-default",
}: TwoColumnLayoutProps) {
  return (
    <div
      className={`two-column-layout-ctn ${className} ${type}`}
      style={{
        gridTemplateColumns: `${leftWidth} ${rightWidth}`,
        gap,
        ...containerStyle,
      }}
    >
      <div className="two-column-layout-column">{leftContent}</div>
      <div className="two-column-layout-column">{rightContent}</div>
    </div>
  );
}
