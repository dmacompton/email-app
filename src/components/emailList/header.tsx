import React, { FunctionComponent } from "react";

import { ICategory } from "../../system/interfaces";

interface Props {
  category: ICategory;
}

const Header: FunctionComponent<Props> = ({ category }: Props) => (
  <header className="header">
    {category.icon} {category.label}
  </header>
);

export default Header;
