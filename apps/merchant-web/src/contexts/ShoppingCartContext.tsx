import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ShoppingCartItem from "@/commons/entities/ShoppingCartItem";
import { handleSubmitCart } from "@/services/checkoutService";
import { CartData } from "@/schemes/shopping-cart/CartDataDto";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import VariantStock from "@/commons/entities/VariantStock";
import axiosInstance from "@/request/AxiosConfig";
import { useAuth } from "@/commons/context/AuthContext";
import { UUID } from "crypto";
import { ShoppingItemSelectedAttribute } from "@/commons/entities/ShoppingItemAttribute";
import { useReservation } from "./ReservationContext";

interface Types {
  products: Array<ShoppingCartItem>;
  addProductToCart: (newProduct: ShoppingCartItem | null) => void;
  initializeShoppingCart: () => void;
  deleteProductToCart: (id: string) => void;
  increaseQuantityProduct: (id: string) => void;
  decreaseQuantityProduct: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
  handleSubmitStripe: () => void;
  handleSuccessPayment: () => void;
}

interface Props {
  children: ReactNode;
}

const ShoppingCartContext = createContext<Types | undefined>(undefined);

export const ShoppingCartProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Array<ShoppingCartItem>>([]);
  const { user } = useAuth();
  const { handleReservation } = useReservation();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  const addProductToCart = (newProduct: ShoppingCartItem | null) => {
    if (newProduct) {
      setProducts((prevProducts) => {
        const existingProduct = prevProducts.find(
          (product) => product.id === newProduct.id
        );
        if (existingProduct) {
          toast.info("This product has already been added", {
            id: `info-${newProduct.id}`,
          });
          return prevProducts;
        } else {
          toast.success("Product added to cart", {
            id: `success-${newProduct.id}`,
          });
          return [...prevProducts, newProduct];
        }
      });
    }
  };

  const deleteProductToCart = (id: string) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    toast.error("Product deleted");
  };

  const updateLocalStorage = () => {
    localStorage.setItem("shoppingCartItems", JSON.stringify(products));
  };

  const initializeShoppingCart = async () => {
    if (isChecking) return;

    const existingCartItems = JSON.parse(
      localStorage.getItem("shoppingCartItems") ?? "[]"
    );

    if (existingCartItems.length > 0) {
      const verifiedCartItems = await Promise.all(
        existingCartItems.map(async (item: ShoppingCartItem) => {
          const response = await axiosInstance.get(
            `/inventory/ProductVariant/${item.productVariantId}`
          );
          const availableStock = response.data.data.stockQuantity;

          if (availableStock > 0) {
            return {
              ...item,
              stock: availableStock,
              quantity: Math.min(item.quantity, availableStock),
            };
          }
          toast.error(`"${item.name}" is out of stock and has been removed`);
          return null;
        })
      );
      setProducts(verifiedCartItems.filter(Boolean));
    }
  };

  const increaseQuantityProduct = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity < product.stock
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantityProduct = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const changeQuantity = (id: string, quantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && quantity >= 1 && quantity <= product.stock
          ? { ...product, quantity }
          : product
      )
    );
  };

  const handleStripe = async () => {
    if (!user) {
      router.push("/login");
      toast.error("Please log in to your account");
      return;
    }

    if (products.length <= 0) {
      router.push("/");
      toast.error("No products in the cart");
      return;
    }

    const cartData: CartData = {
      shoppingCartItems: products.map((product) => ({
        productVariantId: product.productVariantId,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: product.quantity,
      })),
      customer: {
        userId: user.userId ?? "",
        email: user.email ?? "",
      },
    };

    handleSubmitCart(cartData);
  };

  const handleSubmitStripe = async () => {
    if (!user) {
      router.push("/login");
      toast.error("Please log in to your account");
      return;
    }

    if (products.length <= 0) {
      router.push("/");
      toast.error("No products in the cart");
      return;
    }

    const variants = products.map(
      (product) => new VariantStock(product.productVariantId, product.quantity)
    );

    const stockIsValid = await handleStock(variants);
    if (!stockIsValid) return;

    const reservationSuccess = await handleReservation(
      variants,
      user.userId as UUID
    );
    if (!reservationSuccess) return;
    setIsChecking(true);
    handleReduceStock(variants);
    handleStripe();
  };

  const handleVerifyStock = async (product: VariantStock): Promise<boolean> => {
    const response = await axiosInstance.get(
      `/inventory/ProductVariant/${product.variantId}`
    );

    const availableStock = response.data.data.stockQuantity;

    if (availableStock < product.quantity) {
      toast.error(
        `"${product.variantId}" has only ${availableStock} units available`
      );
      product.quantity = availableStock;
      return false;
    }
    return true;
  };

  const handleStock = async (
    variants: Array<VariantStock>
  ): Promise<boolean> => {
    const stockValidation = await Promise.all(
      variants.map((variant) => handleVerifyStock(variant))
    );

    if (stockValidation.some((isValid) => !isValid)) {
      toast.error(
        "Some products are out of stock or have limited availability."
      );
      return false;
    }
    return true;
  };

  const handleReduceStock = async (variantsToReduce: Array<VariantStock>) => {
    await axiosInstance.patch("/inventory/ProductVariant/stocks/reduce", {
      VariantsStock: variantsToReduce,
    });
  };

  const handleSuccessPayment = async () => {
    setProducts([]);
    localStorage.removeItem("shoppingCartItems");
    setIsChecking(false);
    toast.success("Payment successful! Your cart has been cleared.");
  };

  useEffect(() => {
    updateLocalStorage();
  }, [products]);

  const createName = async (
    productId: UUID,
    attributes: Array<ShoppingItemSelectedAttribute>
  ): Promise<string> => {
    const response = await axiosInstance.get(`/inventory/Product/${productId}`);
    const productName = response.data.data.name;

    const attributeValues = attributes.map((att) => att.value).join(", ");

    const name = `${productName} - ${attributeValues}`;
    return name;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (products.length === 0) return;

      try {
        const updatedProducts = await Promise.all(
          products.map(async (product) => {
            const response = await axiosInstance.get(
              `/inventory/ProductVariant/${product.productVariantId}`
            );
            const availableStock = response.data.data.stockQuantity;

            if (product.quantity > availableStock) {
              const name = await createName(
                response.data.data.productId,
                product.attributes
              );
              toast.error(
                `"${name}" stock has been updated. Adjusting quantity`,
                {
                  id: `error-stock-${name}`,
                }
              );
              return { ...product, quantity: availableStock };
            }
            return product;
          })
        );
        setProducts(updatedProducts.filter(Boolean));
      } catch (error) {
        console.error("Error checking stock:", error);
      }
    }, 30_000);

    return () => clearInterval(interval);
  }, [products]);

  const value = useMemo(() => {
    return {
      products,
      addProductToCart,
      initializeShoppingCart,
      deleteProductToCart,
      increaseQuantityProduct,
      decreaseQuantityProduct,
      changeQuantity,
      handleSubmitStripe,
      handleSuccessPayment,
    };
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
