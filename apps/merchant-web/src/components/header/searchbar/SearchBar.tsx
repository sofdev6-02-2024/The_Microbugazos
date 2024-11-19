"use client"

import { SetStateAction, useState } from "react";
import { Searcher } from "./Searcher";
import '@/styles/header/searchbar/search-bar.css';

export function SearchBar() {

  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="searchbar">
      <Searcher value={searchValue} changeValue={handleSearchChange} />
    </div>
  );
}
