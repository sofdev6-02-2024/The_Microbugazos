import { MdOutlineShoppingCart } from "react-icons/md";
import "@/styles/header/shoppingCart/shopping-cart-button.css";

interface Props {
  open: () => void;
  quantity: number;
}

export function ShoppingCartButton({ open, quantity }: Readonly<Props>) {
  return (
    <button onClick={open} className="shopping-cart-button">
      <MdOutlineShoppingCart className="shopping-cart-icon-button" />
      <p
        className={`quantity-items-shopping-cart ${quantity > 0 ? "show" : ""}`}
      >
        {quantity > 99 ? "+99" : quantity}
      </p>
    </button>
  );
}
