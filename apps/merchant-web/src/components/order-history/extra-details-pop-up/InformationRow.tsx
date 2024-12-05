import styles from "@/styles/order-history/OrderHistoryPopUp.module.css";
import { FC } from "react";

interface InformationProps {
  label: string;
  value: string | number;
  isCurrency?: boolean;
  isPercentage?: boolean;
}

export const InformationRow: FC<InformationProps> = ({ label, value, isCurrency = false, isPercentage = false }) => {
  let formattedValue: string;

  if (typeof value === "number") {
    formattedValue = isCurrency
      ? `${value.toFixed(2)} $`
      : isPercentage
        ? `${value.toFixed(0)} %`
        : value.toString();
  } else formattedValue = value;

  return (
    <div className={styles["information-section"]} key={label}>
      <span className="font-medium">{label}:</span>
      <label>{formattedValue}</label>
    </div>
  );
};