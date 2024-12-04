import { useEffect, useState } from "react";
import GenModal, { ModalProps } from "../organisms/modals/GenModal";
import Product from "@/commons/entities/concretes/Product";
import { EditableInput } from "../atoms/inputs/EditableInput";
import { useStore } from "@/commons/context/StoreContext";

interface ConfigureProductOptionsModalProps extends ModalProps {
  currentProduct?: Product;
  onApply: (data: { product?: Product; threshold: number }) => void;
}

export const ConfigureProductOptionsModal = <T,>({
  isOpen,
  onClose,
  onApply,
  currentProduct,
}: Omit<
  ConfigureProductOptionsModalProps,
  "children" | "type" | "onConfirm"
>) => {
  const { store } = useStore();
  const [stockThreshold, setStockThreshold] = useState(0);

  useEffect(() => {
    if (currentProduct || !isOpen) {
      setStockThreshold(currentProduct?.lowStockThreshold ?? 0);
    }

    if (!currentProduct) {
      setStockThreshold(store?.lowStockThreshold ?? 0);
    }
  }, [isOpen, currentProduct]);

  const handleClose = () => {
    setStockThreshold(stockThreshold);
    onClose();
  };

  const handleConfirm = () => {
    if (
      stockThreshold == currentProduct?.lowStockThreshold ||
      stockThreshold == store?.lowStockThreshold
    ) {
      onClose();
      return;
    }

    onApply({
      product: currentProduct,
      threshold: stockThreshold,
    });
  };

  return (
    <GenModal
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      type="apply"
    >
      <div>
        <h2>
          {currentProduct
            ? `Configure ${currentProduct.name}`
            : "Global Configuration"}
        </h2>
        <EditableInput
          value={`${stockThreshold}`}
          onChange={(e) => {
            const val = e.target.value;
            if (!isNaN(Number(val)) && val.length <= 5) {
              if (val === "") {
                setStockThreshold(0);
              } else {
                setStockThreshold(Number(val));
              }
            }
          }}
          label="Stock Threshold"
          isEditable={true}
          isMarkedEditable={true}
          name="stockThreshold"
        />
      </div>
    </GenModal>
  );
};
