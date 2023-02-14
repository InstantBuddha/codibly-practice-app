import React, { useState } from "react";

type SearchbarProps = {
  updateSearchResult: (searchedId: number) => void;
  maxNum: number
};

function Searchbar(props: SearchbarProps) {
  const [searchTerm, setSearchTerm] = useState<number | string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setSearchTerm(event.target.value.replace(/[^\d]/g, ''));
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          inputMode="numeric"
          name="search"
          value={searchTerm}
          onChange={handleChange}
        />
        <button onClick={() => props.updateSearchResult(searchTerm)} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
export default Searchbar;
