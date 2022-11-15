import React from "react";

import IconSVG from "@/widgets/IconSVG";

const InputSearch = () => {
  const [searchValue, setSearchValue] = React.useState<string>("");

  return (
    <form className="input-search">
      <IconSVG iconName="explore" fill="#919090" />
      <input
        type="text"
        placeholder="Search Twitter"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="clear" style={{ display: searchValue ? "flex" : "none" }} onClick={(e) => setSearchValue("")}>
        <img src="/static/svg/close.svg" alt="" />
      </div>
    </form>
  );
};

export default InputSearch;
