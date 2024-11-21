import {CartData} from "@/schemes/shopping-cart/CartDataDto";
import {getProductVariantById} from "@/request/ProductVariantRequests";

export const handleProductByProductVariant = async (cartData: CartData): Promise<boolean> => {
  let allUpdated = true;
  for (const item of cartData.shoppingCartItems) {
    try {
      const response = await getProductVariantById(item.productVariantId);
      item.price = item.price + response.priceAdjustment;

      if (response.productVariantImage.url != null) {
        item.imageUrl = response.productVariantImage.url;
      }
    } catch (error) {
      console.error("Error fetching product variant:", error);
      allUpdated = false;
    }
  }
  return allUpdated;
};
