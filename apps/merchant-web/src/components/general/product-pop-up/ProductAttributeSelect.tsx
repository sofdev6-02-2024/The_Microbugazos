import { Select } from '../Select';
import '@/styles/general/product-attribute-select.css'

interface Props {
  name: string;
  values: string[];
}

export const ProductAttributeSelect = ({name, values}: Readonly<Props>) => {

  return (
    <div className="product-attribute-section">
      <h3 className="product-attribute-name">{name}</h3>
      <Select values={values} />
    </div>
  );
}
