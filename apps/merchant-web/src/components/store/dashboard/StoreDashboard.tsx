import "@/styles/store/StoreDashboard.css";
import { DashboardCard } from "./DashboardCard";
import { TopProductsCard } from "./TopProductCard";
export const StoreDashboard = () => {
  return (
    <div className="store-dashboard">
      <DashboardCard value="900" label="EARNINGS" prefix="$" />
      <DashboardCard value="100" label="SALES" />

      <TopProductsCard
        products={[
          {
            name: "Product 1",
            imageUrl:
              "https://images-cdn.ubuy.com.sa/654f7b1b28aeca744e763d8c-pepsi-cola-20-fl-oz-pack-of-24.jpg",
            id: "wouejqofj34130r-1",
          },
          {
            name: "Product 2",
            imageUrl:
              "https://upload.wikimedia.org/wikipedia/commons/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg",
            id: "wouejqofj34130=1ujr13jr0",
          },
          {
            name: "Product 3",
            imageUrl:
              "https://m.media-amazon.com/images/I/31KrjKzuptL._SS1000_.jpg",
            id: "4ui3j4foi2j43fij4f",
          },
        ]}
      />
    </div>
  );
};
