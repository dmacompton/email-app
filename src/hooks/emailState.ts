import { useState } from "react";
import {DEFAULT_TAB} from "../system/constant";
import {ICategory, IEmail} from "../system/interfaces";

export function useEmailState() {
  const [activeCategory, setActiveCategory] = useState<ICategory>(DEFAULT_TAB);
  const [selectedEmail, setSelectEmail] = useState<IEmail | null>(null);

  const closeEmail = () => {
    setSelectEmail(null);
  };

  return {
    activeCategory,
    setActiveCategory,
    selectedEmail,
    setSelectEmail,
    closeEmail
  };
}
