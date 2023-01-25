import React from "react";

import InputSearch from "@/widgets/InputSearch";
import IconSVG from "@/widgets/IconSVG";

const SearchPeople = () => {
  return (
    <div className="SearchPeople">
      <label htmlFor="search-twitter">
        <IconSVG iconName="explore" fill="#919090" />
        <span>Search Direct Messages</span>
      </label>
      <div className="searching">
        <IconSVG iconName="back" fill="#919090" />
        <InputSearch />
      </div>
    </div>
  );
};

export default SearchPeople;
