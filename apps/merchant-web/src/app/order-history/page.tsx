import {ThemeProvider} from "@/commons/context/ThemeContext";
import {OrderHistoryComponent} from "@/components/order-history/OrderHistoryComponent";

export default function OrderHistory () {
  return (
    <ThemeProvider>
      <main>
        <OrderHistoryComponent />
      </main>
    </ThemeProvider>
  )
}