"use client";
import { SearchIcon } from "@/app/icons";

const Search = ({ placeholder, onSearch }) => {
  return (
    <div className="relative w-full sm:w-auto">
      <span className="absolute top-3 right-4">
        <SearchIcon />
      </span>

      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
        className="--search-input"
      />
    </div>
  );
};

export default Search;
