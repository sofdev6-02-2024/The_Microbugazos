import { FC, useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  RadioGroup,
  Radio
} from "@nextui-org/react";
import { LuChevronDown } from "react-icons/lu";
import styles from "@/styles/order-history/PriceFilterPopUp.module.css";
import { OrderStatus } from "@/types/orderStatus";

interface StatusFilterPopUpProps {
  setSelectedStatus: (status: OrderStatus | null) => void;
  setPageToDefault: (date: number | null) => void;
  applyFilters: () => void;
}

export const StatusFilterPopUp: FC<StatusFilterPopUpProps> = ({
                                                                setSelectedStatus,
                                                                setPageToDefault,
                                                                applyFilters,
                                                              }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClear, setIsClear] = useState(false);

  const handleClear = () => {
    setSelected(null);
    setSelectedStatus(null);
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

  const statusOptions = Object.keys(OrderStatus)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key,
      value: OrderStatus[key as keyof typeof OrderStatus],
    }));

  useEffect(() => {
    if (selected !== null) {
      const matchingStatus = statusOptions.find(
        (option) => option.label === selected
      );

      if (matchingStatus) setSelectedStatus(Number(matchingStatus.value) as OrderStatus);
      else setSelectedStatus(null);
    }}, [selected]);
  return (
    <Popover isOpen={isDropdownOpen} onOpenChange={setIsDropdownOpen} placement="bottom">
      <PopoverTrigger>
        <Button
          variant="bordered"
          endContent={<LuChevronDown />}
          className={styles["trigger-button"]}
        >
          Status
        </Button>
      </PopoverTrigger>
      <PopoverContent className={styles["sc-container"]}>
        <div className={styles["item"]}>
          <RadioGroup
            label="Select an Order Status"
            value={selected || ""}
            onValueChange={setSelected}
          >
            {statusOptions.map((status) => (
              <Radio key={status.value} value={status.label}>
                {status.label}
              </Radio>
            ))}
          </RadioGroup>
        </div>
        <div key="edit" className={styles["item"]}>
          <div className={styles["item-content-buttons"]}>
            <Button className={styles["button-accept"]} onClick={applyFilter}>
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