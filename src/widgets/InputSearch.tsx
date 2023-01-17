import React from "react";

import IconSVG from "@/widgets/IconSVG";

const InputSearch = () => {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [displaySuggestions, setDisplaySuggestions] = React.useState<boolean>(false);
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

  React.useEffect(() => {
    const inuput = document.getElementById("input-search");
    if (inuput != null) {
      inuput.addEventListener("focus", (e) => {});
    }
  });

  return (
    <div className="input-search-conatiner">
      <form className="input-search" onSubmit={handleSubmit}>
        <IconSVG iconName="explore" fill="#919090" handleClick={handleSubmit} />
        <input
          id="search-twitter"
          type="text"
          placeholder="Search Twitter"
          autoComplete="off"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          ref={inputRef}
          onBlur={() => setDisplaySuggestions((current) => !current)}
          onFocus={() => setDisplaySuggestions((current) => !current)}
        />
        <div className="clear" style={{ display: searchValue ? "flex" : "none" }} onClick={handleReset}>
          <img src="/static/svg/close.svg" alt="" />
        </div>
      </form>
      <div className="suggestions" style={{display: displaySuggestions ? "block" : "none"}}>
        <ul>
          <li>
            <span>search I interviewed over 50 back-end engineers in the last 2 years.</span>
            <div className="close-img">
              <img src="/static/svg/close.svg" alt="remove" />
            </div>
          </li>
          <li>
            <span>search 2</span>
            <div className="close-img">
              <img src="/static/svg/close.svg" alt="remove" />
            </div>
          </li>
          <li>
            <span>search 3</span>
            <div className="close-img">
              <img src="/static/svg/close.svg" alt="remove" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InputSearch;
