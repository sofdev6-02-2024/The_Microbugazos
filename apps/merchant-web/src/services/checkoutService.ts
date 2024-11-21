import { loadStripe } from "@stripe/stripe-js";
import { CartData } from "@/schemes/shopping-cart/CartDataDto";
import {createProcessPayment} from "@/request/CheckoutProcessRequests";
import {handleProductByProductVariant} from "@/services/productItemService";

export const handleSubmitCart = async (cartData: CartData) => {
  const allProductsUpdated = await handleProductByProductVariant(cartData);
  if (!allProductsUpdated) {
    console.error("Error: Not all products could be updated. Please try again.");
    return;
  }

  const stripe = await loadStripe(
    "pk_test_51Q81UpP3WBhplXYwggVU8aKSusfUgfjKqFPz6amcMmjkcnJSJVOL22DHfqQiyou6mtPlbTpOtehXhG0wFRFIo47l00rb1JJ1Qc"
  );

  if (!stripe) {
    console.error("Stripe failed to load");
    return;
  }

  try {
    const response = await createProcessPayment(cartData);
    const result = await stripe.redirectToCheckout({
      sessionId: response,
    });

    if (result.error) {
      console.error("Stripe checkout error:", result.error.message);
    }
  } catch (error) {
    console.error("Error submitting cart:", error);
  }
};
