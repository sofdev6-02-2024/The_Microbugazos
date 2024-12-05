import {ChangeEvent, FC, useEffect, useState} from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { LuChevronDown } from "react-icons/lu";
import styles from "@/styles/order-history/DateFilterPopUp.module.css"

interface DateFilterPopUpProps {
  selectedStartDate: string | null;
  selectedEndDate: string | null;
  setSelectedStartDate: (date: string | null) => void;
  setSelectedEndDate: (date: string | null) => void;
  setPageToDefault: (date: number | null) => void;
  applyFilters:() => void;
}

export const DateFilterPopUp: FC<DateFilterPopUpProps> = ({
                                                            selectedStartDate,
                                                            selectedEndDate,
                                                            setSelectedStartDate,
                                                            setSelectedEndDate,
                                                            setPageToDefault,
                                                            applyFilters
                                                         }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const handleOpenChange = (open: boolean) => {
    setIsDropdownOpen(open);
  };

  const handleDateChange = (isStartDate: boolean, e: ChangeEvent<HTMLInputElement>) => {
    if (isStartDate)
      setSelectedStartDate(e.target.value);
    else
      setSelectedEndDate(e.target.value);
  };

  const handleClear = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
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
    <Dropdown isOpen={isDropdownOpen} onOpenChange={handleOpenChange} closeOnSelect={false}>
      <DropdownTrigger>
        <Button
          variant="bordered"
          endContent={<LuChevronDown />}
          className={styles["trigger-button"]}
        >
          Date
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Date Filter Actions">
        <DropdownItem key="from" className={styles["item"]} textValue="Select From Date">
          <div className={styles["item-content"]}>
            <span>From:</span>
            <input
              className={styles["date-picker"]}
              type="date"
              value={selectedStartDate || ""}
              onChange={(e) => handleDateChange(true, e)}
            />
          </div>
        </DropdownItem>
        <DropdownItem key="to" className={styles["item"]} textValue="Select To Date">
          <div className={styles["item-content"]}>
            <span>To:</span>
            <input
              className={styles["date-picker"]}
              type="date"
              value={selectedEndDate || ""}
              onChange={(e) => handleDateChange(false, e)}
            />
            <hr className={styles["separator"]}/>
          </div>
        </DropdownItem>
        <DropdownItem key="edit" className={styles["item"]} textValue="Actions">
          <div className={styles["item-content-buttons"]}>
            <Button className={styles["button-accept"]} onClick={applyFilter} >
              Accept
            </Button>
            <Button className={styles["button-clear"]} onClick={handleClear}>
              Clear
            </Button>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
