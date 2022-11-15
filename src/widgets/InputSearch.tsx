import React from "react";

import IconSVG from "@/widgets/IconSVG";

const InputSearch = () => {
  const [searchValue, setSearchValue] = React.useState<string>("");
  // const [searchData, setSearchData] = React.useState();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (searchValue) window.confirm(searchValue) && setSearchValue("");
  };

  const handleReset = () => {
    // 👉️ ref could be null here
    if (inputRef.current != null) {
      setSearchValue("");
      inputRef.current.focus();
    }
  };

  return (
    <form className="input-search" onSubmit={handleSubmit}>
      <IconSVG iconName="explore" fill="#919090" handleClick={handleSubmit} />
      <input
        type="text"
        placeholder="Search Twitter"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        ref={inputRef}
      />
      <div className="clear" style={{ display: searchValue ? "flex" : "none" }} onClick={handleReset}>
        <img src="/static/svg/close.svg" alt="" />
      </div>
    </form>
  );
};

export default InputSearch;
