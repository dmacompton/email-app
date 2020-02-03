import React, { FunctionComponent } from "react";

import { ICategory } from "../../system/mock/constant";

interface Props {
  category: ICategory;
}

const Header: FunctionComponent<Props> = ({ category }: Props) => {
  return (
    <header className="header">
      {category.icon} {category.label}
    </header>
  );
};

export default Header;
