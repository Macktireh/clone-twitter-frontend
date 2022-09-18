import React from "react";

import IconSVG from "@/widgets/IconSVG";

const InputSearch = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="input-search">
      <IconSVG iconName="explore" fill="#919090" />
      <input
        type="search"
        placeholder="Search Twitter"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {/* <div className="clear" style={{ display: value ? "flex" : "none" }} onClick={(e) => setValue("")}>
        <img src="/static/svg/close.svg" alt="" />
      </div> */}
    </div>
  );
};

export default InputSearch;
