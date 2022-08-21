import * as React from "react";

import { TTabState } from "@/models";

type Props = {
  listTabs: TTabState[];
  activeTab: number;
  flexGrow: number;
  toggleTab: (id: number) => void;
};

const NavTabs: React.FC<Props> = ({ listTabs, activeTab, flexGrow, toggleTab }) => {
  return (
    <div className="NavTabs">
      {listTabs.map((tab) => (
        <div
          className="box-btn"
          onClick={() => toggleTab(tab.id)}
          key={tab.id}
          style={{ flexGrow: tab.id === flexGrow ? 1.5 : "" }}
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
