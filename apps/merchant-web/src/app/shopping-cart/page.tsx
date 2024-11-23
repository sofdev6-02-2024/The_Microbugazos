import { ShoppingCartInfo } from '@/components/shopping-cart/ShoppingCartInfo'
import { ShoppingCartList } from '@/components/shopping-cart/ShoppingCartList'
import '@/styles/shopping-cart-page/shopping-cart-page.css'

export default function ShoppingCartPage() {
  return (
    <div className="shopping-cart-page">
      <ShoppingCartList />
      <ShoppingCartInfo />
    </div>
  )
}