import React, { FunctionComponent } from "react";

import { ICONS } from "../../system/interfaces";

interface Props {
  glyph: ICONS;
}

const Icon: FunctionComponent<Props> = ({ glyph }: Props) => (
  <span className="icon">{glyph}</span>
);

export default Icon;
