import React from "react";

import { TTabState } from "@/models";
import { Link } from "react-router-dom";

interface propsTypes {
  listTabs: TTabState[];
  activeTab: number;
  toggleTab: (id: number) => void;
  linkActive: boolean;
  link?: string;
}

const NavTabs: React.FC<propsTypes> = ({ listTabs, activeTab, toggleTab, linkActive, link }) => {
  return (
    <div className="NavTabs">
      {listTabs.map((tab) => (
        linkActive ? (
          <Link
            to={tab.id === 1 ? link + "followers" : link + "following"}
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
          </Link>
        ) : (
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
        )
      ))}
    </div>
  );
};

export default NavTabs;
