import { useRouter } from "next/navigation";
import "@/styles/inventory/no-products-found.css";
import { Button } from "../atoms/buttons/Button";

export const NoProductsFound = () => {
  const router = useRouter();
  const addNewProduct = () => {
    router.push("/store/add-product");
  };

  return (
    <div className="no-products-found-ctn">
      <span>No Products Found</span>
      <Button handleClick={addNewProduct}>Add Product</Button>
    </div>
  );
};
