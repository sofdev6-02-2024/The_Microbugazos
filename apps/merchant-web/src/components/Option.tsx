import React from 'react';
import styles from '@/styles/Option.module.css'
interface FormInputProps {
    icon: React.ElementType;
    text: string;
}

export const Option: React.FC<FormInputProps> = ({icon: Icon, text }) => {
    return (
        <div className={styles.container}>
            <Icon className={styles.icon} />
            <p>{text}</p>
        </div>
    );
};
