import React, { FunctionComponent } from "react";
import classNames from "classnames";

import Icon from "../icon";
import { ICategory } from "../../system/interfaces";

interface Props extends ICategory {
  active: boolean;
  onClick(): void;
}

const SidebarLink: FunctionComponent<Props> = ({
  label,
  icon,
  active,
  onClick
}: Props) => (
  <div className={classNames("sidebar-link", { active })} onClick={onClick}>
    {icon && <Icon glyph={icon} />}
    {label}
  </div>
);

export default SidebarLink;
