import React, { FunctionComponent } from "react";

import SidebarLink from "./sidebarLink";

import "./sidebar.scss";
import {ICategory} from "../../system/interfaces";

interface Props {
  folders: ICategory[];
  activeCategory: ICategory;
  setActiveCategory(category: ICategory): void;
}

const Sidebar: FunctionComponent<Props> = ({
  folders,
  activeCategory,
  setActiveCategory
}: Props) => (
  <div className="sidebar">
    <div className="sidebar-category">
      {folders.map(item => (
        <SidebarLink
          {...item}
          key={item.link}
          active={activeCategory.link === item.link}
          onClick={() => {
            setActiveCategory(item);
          }}
        />
      ))}
    </div>
  </div>
);

export default Sidebar;
