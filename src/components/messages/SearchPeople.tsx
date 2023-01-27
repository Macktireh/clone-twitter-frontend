import React from "react";

import InputSearch from "@/widgets/InputSearch";
import IconSVG from "@/widgets/IconSVG";

const SearchPeople = () => {
  const [isSearching, setIsSearching] = React.useState(false); // eslint-disable-line react/no-unused-state

  return (
    <div className="SearchPeople">
      <label
        htmlFor="search-twitter"
        onClick={() => setIsSearching(!isSearching)}
        style={{ display: isSearching ? "none" : "flex" }}
      >
        <IconSVG iconName="explore" fill="#919090" />
        <span>Search Direct Messages</span>
      </label>
      <div className="searching" style={{ display: isSearching ? "flex" : "none" }}>
        <div className="back" onClick={() => setIsSearching(!isSearching)}>
          <IconSVG iconName="back" fill="#919090" />
        </div>
        <InputSearch />
      </div>
    </div>
  );
};

export default SearchPeople;
