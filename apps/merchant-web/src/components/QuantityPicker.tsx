import '@/styles/quantity-picker.css'

interface Props {
  quantity: number,
  increase: () => void,
  decrease: () => void,
  changeQuantity: (event: { target: { value: string; }; }) => void
}

export function QuantityPicker({quantity, increase, decrease, changeQuantity}: Readonly<Props>) {
  return (
    <div className="quantity-picker">
      <button className="quantity-picker-button decrease-button" onClick={decrease}>-</button>
      <input type="text" name="quantity-picker-input" id="quantity-picker-input" value={quantity} onChange={changeQuantity} />
      <button className="quantity-picker-button increase-button" onClick={increase}>+</button>
    </div>
  );
}
