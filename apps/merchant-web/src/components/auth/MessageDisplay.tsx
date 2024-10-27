import React from 'react';
import styles from '../../styles/auth/MessageDisplay.module.css';

interface MessageDisplayProps {
  message: string;
  type: 'success' | 'error';
}

export const MessageDisplay: React.FC<MessageDisplayProps> = ({ message, type }) => {
  if (!message) return null;
  
  return (
    <div className={`${styles.message} ${styles[type]}`}>
      {message}
    </div>
  );
};
