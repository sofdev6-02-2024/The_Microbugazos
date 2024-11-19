interface Product {
  imageUrl: string;
  id: string;
  name: string;
}

interface TopProductsProps {
  products: Product[];
}

export const TopProductsCard = ({ products }: TopProductsProps) => {
  return (
    <div className="card card-top-products">
      <span className="card-title">Top Products</span>
      <div className="dashboard-top-products">
        {products.map((product, index) => (
          <div className="dashboard-top-product">
            <p>#{index + 1}</p>
            <img src={product.imageUrl} alt={product.name}  />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
