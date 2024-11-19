import { MdAddShoppingCart } from "react-icons/md";
import Product from "@/commons/entities/concretes/Product"
import '@/styles/general/add-to-cart.css'

interface Props {
  product: Product;
  action: (product: Product) => void;
}

export const AddToCart = ({product, action}: Props) => {
  return (
    <button className="add-to-cart-button" onClick={() => action(product)}>
      <MdAddShoppingCart />
      Add to cart
    </button>
  );
}
