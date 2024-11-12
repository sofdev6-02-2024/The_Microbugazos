import { useEffect, useState } from "react";
import notificationStyle from "../styles/components/Notification.module.css";

interface NotificationProps {
    title: string;
    description: string;
    duration?: number;
    isOpen: boolean;
    setIsOpen: (boolean) => void;
}

export default function Notification({ title, description, duration = 1000, isOpen, setIsOpen }: NotificationProps) {
    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(false), duration!);

        return () => clearTimeout(timer);
    }, [duration]);

    return (
        <div className={notificationStyle.container}>
            {isOpen && (
                <div>
                    <label><b>{title}</b></label><br/>
                    <label>{description}</label>
                </div>
            )}
        </div>
    );
}
