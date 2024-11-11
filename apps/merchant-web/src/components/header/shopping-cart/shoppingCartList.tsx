import ShoppingCartItem from "@/commons/entities/ShoppingCartItem";
import { FaRegSadTear } from "react-icons/fa";
import { ShoppingCartItemCard } from "./ShoppingCartItemCard";
import "@/styles/header/shoppingCart/shoppingCartList.css";
import useNavigate from "@/commons/hooks/UseNavigate";

interface Props {
  items: Array<ShoppingCartItem>;
  isOpen: boolean;
}

export function ShoppingCartList({ items, isOpen }: Readonly<Props>) {

  const navigate = useNavigate();

  const handleGoShoppingCart = () => {
    navigate("/shopping-cart");
  }

  return (
    <div className={`shopping-cart-list ${isOpen ? 'opened' : ''}`}>
      <h2 className="shopping-cart-list-heading">Shopping cart</h2>
      <div className="shopping-cart-list-items-section">
        {items && items.length > 0 ? (
          items.map((item) => {
            return <ShoppingCartItemCard key={item.id} item={item} />;
          })
        ) : (
          <div className="shopping-cart-empty">
            <FaRegSadTear className="shopping-cart-empty-icon" />
            <p className="shopping-cart-empty-text">
              Your shopping cart is empty.
            </p>
          </div>
        )}
      </div>
      <div className="shopping-cart-list-more-options">
        <p className="shopping-cart-list-total">
          Total: {items.reduce((total, item) => total + item.price, 0)} $
        </p>
        <button
          className="shopping-cart-list-go-button"
          disabled={items && items.length === 0}
          onClick={handleGoShoppingCart}
        >
          Go shopping cart
        </button>
      </div>
    </div>
  );
}
