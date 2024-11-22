import "@/styles/shopping-cart/shopping-cart-info/price-info.css"

interface Props {
  name: string;
  value: string;
}

export const PriceInfo = ({name, value}: Props) => {
  return (
    <div className="price-info-section">
      <p className="price-info-name">{name}</p>
      <p className="price-info-value">{value}</p>
    </div>
  )
}