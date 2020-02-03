import React, { FunctionComponent } from "react";
import classnames from "classnames";

import Icon from "../icon";
import { ICategory } from "../../system/mock/constant";

interface Props extends ICategory {
  active: boolean;
  onClick(): void;
}

const SidebarLink: FunctionComponent<Props> = ({
  link,
  label,
  icon,
  active,
  onClick
}: Props) => {
  return (
    <div className={classnames("sidebar-link", { active })} onClick={onClick}>
      {icon && <Icon glyph={icon} />}
      {label}
    </div>
  );
};

export default SidebarLink;
