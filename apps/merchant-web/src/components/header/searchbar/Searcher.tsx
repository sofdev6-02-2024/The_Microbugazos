import { MdSearch } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import "@/styles/header/searchbar/searcher.css";
import { useState } from "react";

interface Props {
  onSearch: (value: string) => Promise<void>;
  changeValue?: (value: string) => void;
  value?: string;
}

export function Searcher({
  onSearch,
  changeValue = () => {},
  value = "",
}: Readonly<Props>) {
  const [searchApplied, setSearchApplied] = useState(false);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeValue(event.target.value);
  };

  const resetSearch = async () => {
    changeValue("");
    await onSearch("");
    setSearchApplied(false);
  };

  const handleSearch = async () => {
    if (!value) {
      return;
    }
    changeValue(value);
    await onSearch(value);
    setSearchApplied(true);
  };

  return (
    <div className="searcher">
      <input
        type="text"
        name="search-input"
        id="search-input"
        placeholder="Search something..."
        value={value}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      {searchApplied ? (
        <IoClose
          className="search-icon"
          cursor={"pointer"}
          onClick={resetSearch}
        />
      ) : (
        <MdSearch
          className="search-icon"
          cursor={"pointer"}
          onClick={async () => await handleSearch()}
        />
      )}
    </div>
  );
}
