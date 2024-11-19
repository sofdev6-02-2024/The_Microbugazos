import SideMenuOption from "@/commons/entities/SideMenuOption";
import { Option } from "./Option";
import { iconMapper } from "@/utils/iconMapper";
import "@/styles/header/menu/options.css";

interface Props {
  name: string;
  options: Array<SideMenuOption>;
}

export const Options = ({name, options}: Props) => {
  return (
    <div className="options-section">
      <h4 className="options-name">{name}</h4>
      <div className="options-list">
        {
          options.map((option) => (
            <Option key={option.text} icon={iconMapper(option.icon)} text={option.text} route={option.route} />
          ))
        }
      </div>
    </div>
  )
}
