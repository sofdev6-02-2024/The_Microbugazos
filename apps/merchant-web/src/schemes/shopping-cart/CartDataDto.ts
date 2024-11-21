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
  address: string;
  city: string;
  country: string;
}

export interface CartData {
  shoppingCartItems: ShoppingCartItem[];
  customer: Customer;
}
