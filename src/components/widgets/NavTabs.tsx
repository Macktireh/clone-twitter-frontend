import React from "react";

import { TTabState } from "@/models";

type Props = {
  listTabs: TTabState[];
  activeTab: number;
  toggleTab: (id: number) => void;
};

const NavTabs: React.FC<Props> = ({ listTabs, activeTab, toggleTab }) => {
  return (
    <div className="NavTabs">
      {listTabs.map((tab) => (
        <div
          className="box-btn"
          onClick={() => toggleTab(tab.id)}
          key={tab.id}
          style={{ flexGrow: tab.grow ? 1.5 : "" }}
        >
          <button
            className={activeTab === tab.id ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(tab.id)}
          >
            {tab.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default NavTabs;
