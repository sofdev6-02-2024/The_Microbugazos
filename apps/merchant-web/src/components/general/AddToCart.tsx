import { MdAddShoppingCart } from "react-icons/md";
import '@/styles/general/AddToCart.css'

interface Props {
  action: () => void;
}

export const AddToCart = ({action}: Props) => {
  return (
    <button className="add-to-cart-button" onClick={action}>
      <MdAddShoppingCart />
      Add to cart
    </button>
  );
}