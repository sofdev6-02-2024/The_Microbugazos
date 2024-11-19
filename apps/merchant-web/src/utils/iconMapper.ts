import { IconType } from "react-icons/lib";
import { MdOutlineHome, MdStorefront } from "react-icons/md";

const iconMap: Record<string, IconType> = {
  "MdOutlineHome": MdOutlineHome,
  "MdStorefront": MdStorefront
}

export function iconMapper(icon: string): IconType {
  return iconMap[icon];
}
