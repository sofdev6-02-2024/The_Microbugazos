import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ShoppingCartItem from "../entities/ShoppingCartItem";

interface Types {
  products: Array<ShoppingCartItem>;
  addProductToCart: (newProduct: ShoppingCartItem | null) => void;
  initializeShoppingCart: () => void;
  deleteProductToCart: (id: string) => void;
}

interface Props {
  children: ReactNode;
}

const ShoppingCartContext = createContext<Types | undefined>(undefined);

export const ShoppingCartProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Array<ShoppingCartItem>>([]);

  const addProductToCart = (newProduct: ShoppingCartItem | null) => {
    console.log("New product");
    console.log(newProduct);

    if (newProduct) {
      setProducts([...products, newProduct]);
    }

    updateLocalStorage();
  };

  const deleteProductToCart = (id: string) => {
    const updatedProducts = products.filter((product) => product.id!== id);
    setProducts(updatedProducts);
  }

  const updateLocalStorage = () => {
    localStorage.setItem("shoppingCartItems", JSON.stringify(products));
  };

  const initializeShoppingCart = () => {
    const existingCartItems = JSON.parse(
      localStorage.getItem("shoppingCartItems") ?? "[]"
    );

    setProducts(existingCartItems);
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  useEffect(() => {
    updateLocalStorage();
  }, [products]);

  const value = useMemo(() => {
    return { products, addProductToCart, initializeShoppingCart, deleteProductToCart };
  }, [products]);

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }

  return context;
};
