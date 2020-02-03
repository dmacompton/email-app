import React, { FunctionComponent } from "react";

import { ICONS } from "../../system/mock/constant";

interface Props {
  glyph: ICONS;
}

const Icon: FunctionComponent<Props> = ({ glyph }: Props) => {
  return <span className="icon">{glyph}</span>;
};

export default Icon;
