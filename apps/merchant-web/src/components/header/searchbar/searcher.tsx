import { MdSearch } from "react-icons/md";
import "@/styles/header/searchbar/searcher.css";
import { SetStateAction } from "react";

interface Props {
  value: string;
  changeValue: (event: { target: { value: SetStateAction<string> } }) => void;
}

export function Searcher({ value, changeValue }: Readonly<Props>) {
  return (
    <div className="searcher">
      <input
        type="text"
        name="search-input"
        id="search-input"
        placeholder="Search something..."
        value={value}
        onChange={changeValue}
      />
      <MdSearch className="search-icon" />
    </div>
  );
}
