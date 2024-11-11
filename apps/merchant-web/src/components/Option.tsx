import React from 'react';
import styles from '@/styles/Option.module.css'
import {useRouter} from "next/navigation";

interface FormInputProps {
    icon: React.ElementType;
    text: string;
}

export const Option: React.FC<FormInputProps> = ({icon: Icon, text }) => {
    const router = useRouter();

    const handleRouterNavigation = () => {
        const formattedText = text.toLowerCase().replace(/\s/g, '-');
        if (formattedText !== "home") {
            router.push(`/${formattedText}`);
        } else {
            router.push('/');
        }
    }
    return (
        <div className={styles.container} onClick={handleRouterNavigation}>
            <Icon className={styles.icon} />
            <p>{text}</p>
        </div>
    );
};
