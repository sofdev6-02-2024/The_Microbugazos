import styles from "@/styles/auth/message-display.module.css";

interface MessageDisplayProps {
  message: string;
  type: "success" | "error";
}

export const MessageDisplay = ({ message, type }: MessageDisplayProps) => {
  if (!message) return null;

  return <div className={`${styles.message} ${styles[type]}`}>{message}</div>;
};
