import { useState } from "react";
import { DEFAULT_TAB, ICategory, IEmail } from "../system/mock/constant";

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
