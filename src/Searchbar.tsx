import React, { useState } from "react";

type SearchbarProps = {
  updateSearchResult: (searchedId: number) => void;
  displayFullList: () => void;
  maxNum: number;
};

function Searchbar(props: SearchbarProps) {
  const [searchTerm, setSearchTerm] = useState<any>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setSearchTerm(event.target.value.replace(/[^\d]/g, ""));
  };

  const submitSearch = () => {
    setSearchTerm("");
    return props.updateSearchResult(searchTerm);
  };

  return (
    <div className="searchbar">
      <form onSubmit={(e) => e.preventDefault()}>
        <button onClick={props.displayFullList}>Home</button>
        <input
          type="text"
          inputMode="numeric"
          name="search"
          value={searchTerm}
          onChange={handleChange}
          className="searchInput"
        />
        <button onClick={submitSearch} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
export default Searchbar;
