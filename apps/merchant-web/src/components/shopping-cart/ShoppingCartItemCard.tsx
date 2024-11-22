import ShoppingCartItem from "@/commons/entities/ShoppingCartItem";
import "@/styles/shopping-cart/shopping-cart-item-card-page.css";
import { QuantityPicker } from "../quantityPicker";
import { useShoppingCart } from "@/commons/context/ShoppingCartContext";
import { MdDeleteOutline } from "react-icons/md";

interface Props {
  item: ShoppingCartItem;
}

export const ShoppingCartItemCard = ({ item }: Props) => {
  const {
    changeQuantity,
    increaseQuantityProduct,
    decreaseQuantityProduct,
    deleteProductToCart,
  } = useShoppingCart();

  const handleIncreaseQuantity = () => {
    increaseQuantityProduct(item.id);
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantityProduct(item.id);
  };

  const handleQuantityChange = (event: { target: { value: string } }) => {
    const newQuantity = parseInt(event.target.value);
    changeQuantity(item.id, newQuantity);
  };

  return (
    <div className="shopping-cart-item-card-page">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="shopping-cart-item-card-page-image"
      />
      <div className="shopping-cart-item-card-page-info-section">
        <h2 className="shopping-cart-item-card-page-name">{item.name}</h2>
        <p className="shopping-cart-item-card-page-price">{item.price} $</p>
        <div className="shopping-cart-item-card-page-attribute">
          {item.attributes.map((attribute) => {
            return (
              <p key={`${attribute.name}-${attribute.value}-${item.id}`}>
                {attribute.name}: {attribute.value}
              </p>
            );
          })}
        </div>
      </div>
      <QuantityPicker
        quantity={item.quantity}
        increase={handleIncreaseQuantity}
        decrease={handleDecreaseQuantity}
        changeQuantity={handleQuantityChange}
      />
      <div className="shopping-cart-item-card-page-actions-section">
        <button
          className="shopping-cart-item-card-page-delete"
          onClick={() => deleteProductToCart(item.id)}
        >
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
};
