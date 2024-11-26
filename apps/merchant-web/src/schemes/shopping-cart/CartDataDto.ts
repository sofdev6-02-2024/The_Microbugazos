interface ShoppingCartItem {
  productVariantId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface Customer {
  userId: string;
  email: string;
}

export interface CartData {
  shoppingCartItems: ShoppingCartItem[];
  customer: Customer;
}
