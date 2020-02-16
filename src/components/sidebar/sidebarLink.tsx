import React, { FunctionComponent, useCallback } from "react";
import classNames from "classnames";

import Icon from "../icon";
import { ICategory } from "../../system/interfaces";

interface Props {
  active: boolean;
  item: ICategory;
  onClick(item: ICategory): void;
}

const SidebarLink: FunctionComponent<Props> = ({
  active,
  onClick,
  item
}: Props) => {
  const handleClick = useCallback(() => {
    onClick(item);
  }, [item]);

  return (
    <div
      className={classNames("sidebar-link", { active })}
      onClick={handleClick}
    >
      {item.icon && <Icon glyph={item.icon} />}
      {item.label}
    </div>
  );
};

export default React.memo(SidebarLink);
