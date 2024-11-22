import { BiSortDown } from "react-icons/bi";
import { BiSortUp } from "react-icons/bi";
import { BiSortAlt2 } from "react-icons/bi";
import { SortingType } from "@/commons/entities/SortingType";

interface SortingIconProps {
  sortType: SortingType;
}

export const SortingIcon = ({ sortType }: SortingIconProps) => {
  const sortingIcons: Record<SortingType, JSX.Element> = {
    [SortingType.NONE]: <BiSortAlt2 />,
    [SortingType.ASC]: <BiSortUp  />,
    [SortingType.DESC]: <BiSortDown  />,
  };

  return sortingIcons[sortType] || <BiSortAlt2 />;
};
