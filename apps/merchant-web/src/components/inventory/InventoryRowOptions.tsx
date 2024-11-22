import { useRef, useEffect } from "react";
import "@/styles/inventory/inventory-row-options.css";

interface InventoryRowOptionsProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  onRemove: () => void;
}

export const InventoryRowOptions = ({
  isVisible,
  setIsVisible,
  onRemove,
}: InventoryRowOptionsProps) => {
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ul
      ref={menuRef}
      className={`admin-inventory-row-options-ctn ${
        isVisible ? "show-inventory-row-options" : ""
      }`}
    >
      <li onClick={onRemove}>Remove</li>
    </ul>
  );
};
