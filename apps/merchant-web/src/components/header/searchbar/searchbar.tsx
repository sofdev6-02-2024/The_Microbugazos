"use client";

import { useState } from "react";
import { Searcher } from "./searcher";
import "@/styles/header/searchbar/searchbar.css";

export function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="searchbar">
      <Searcher
        value={searchValue}
        changeValue={setSearchValue}
        onSearch={async (value) => console.log(value)}
      />
    </div>
  );
}
