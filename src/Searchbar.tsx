import React, { useState } from "react";

function Searchbar(props) {
  const [searchTerm, setSearchTerm] = useState<number>();


  const handleChange = (event) => {
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
        <button onClick={() => props.searchId(searchTerm)} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
export default Searchbar;
