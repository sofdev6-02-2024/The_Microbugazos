import {FC, useEffect, useState} from "react";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/input";
import { LuChevronDown } from "react-icons/lu";
import styles from "@/styles/order-history/PriceFilterPopUp.module.css";

interface PriceFilterPopUpProps {
  selectedStartPrice: number | null;
  selectedEndPrice: number | null;
  setSelectedStartPrice: (price: number | null) => void;
  setSelectedEndPrice: (price: number | null) => void;
  setPageToDefault: (date: number | null) => void;
  applyFilters:() => void;
}

export const PriceFilterPopUp: FC<PriceFilterPopUpProps> = ({
                                                              selectedStartPrice,
                                                              selectedEndPrice,
                                                              setSelectedStartPrice,
                                                              setSelectedEndPrice,
                                                              setPageToDefault,
                                                              applyFilters
                                                         }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClear, setIsClear] = useState(false);

  const handleClear = () => {
    setSelectedStartPrice(null);
    setSelectedEndPrice(null);
    setPageToDefault(1);
    setIsClear(true);
  };

  const applyFilter = () => {
    setPageToDefault(1);
    applyFilters()
    setIsClear(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    applyFilters();
  }, [isClear]);

  return (
    <Popover isOpen={isDropdownOpen} onOpenChange={setIsDropdownOpen} placement="bottom" >
      <PopoverTrigger>
        <Button
          variant="bordered"
          endContent={<LuChevronDown />}
          className={styles["trigger-button"]}
        >
          Price
        </Button>
      </PopoverTrigger>
      <PopoverContent className={styles["sc-container"]}>
        <div key="from" className={styles["item"]}>
          <Input
            className={styles["price-input"]}
            value={selectedStartPrice !== null ? String(selectedStartPrice) : ''}
            onChange={(e) => setSelectedStartPrice(Number(e.target.value) || null)}
            type="number"
            label="Min Price"
            placeholder="0.00"
            labelPlacement="outside"
            startContent={
              <div className={`${styles["no-pointer-events"]} ${styles["flex-row-center"]}`}>
                <span className={styles["currency-symbol"]}>$</span>
              </div>
            }
          />
        </div>
        <div key="to" className={styles["item"]}>
          <Input
            className={styles["price-input"]}
            value={selectedEndPrice !== null ? String(selectedEndPrice) : ''}
            onChange={(e) => setSelectedEndPrice(Number(e.target.value) || null)}
            type="number"
            label="Max Price"
            placeholder="0.00"
            labelPlacement="outside"
            startContent={
              <div className={`${styles["no-pointer-events"]} ${styles["flex-row-center"]}`}>
                <span className={styles["currency-symbol"]}>$</span>
              </div>
            }
          />
        </div>
        <div key="edit" className={styles["item"]}>
          <div className={styles["item-content-buttons"]}>
          <Button className={styles["button-accept"]} onClick={applyFilter} >
              Accept
            </Button>
            <Button className={styles["button-clear"]} onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};