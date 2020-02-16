import React, { FunctionComponent, useContext, useCallback } from "react";

import SidebarLink from "./sidebarLink";

import "./sidebar.scss";
import { ICategory } from "../../system/interfaces";
import { EmailContext } from "../../Contexts/emailProvider";

interface Props {
  folders: ICategory[];
}

const Sidebar: FunctionComponent<Props> = ({ folders }: Props) => {
  const { activeCategory, setActiveCategory } = useContext(EmailContext);

  const handleClick = useCallback(
    (item: ICategory) => {
      setActiveCategory(item);
    },
    [setActiveCategory]
  );

  return (
    <div className="sidebar">
      <div className="sidebar-category">
        {folders.map(item => (
          <SidebarLink
            item={item}
            key={item.link}
            active={activeCategory.link === item.link}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
