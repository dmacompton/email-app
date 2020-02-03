import React, { FunctionComponent, useEffect, useState } from "react";

import ListItem from "./listItem";
import { ICategory, IEmail } from "../../system/interfaces";

interface Props {
  emails: IEmail[];
  isLoading: boolean;
  category: ICategory;
  selectedEmail: IEmail | null;
  onSelectEmail(email: IEmail): void;
  onToggleUnread(id: IEmail["id"]): void;
  onDelete(id: IEmail["id"]): void;
}

const ListComponent: FunctionComponent<Props> = ({
  emails,
  isLoading,
  category,
  selectedEmail,
  onSelectEmail,
  onToggleUnread,
  onDelete
}: Props) => {
  useEffect(
    () => {
      const newEmails = emails.filter(category.filter);
      setFilteredEmail(newEmails);
    },
    [category, emails]
  );

  const [filteredEmail, setFilteredEmail] = useState<IEmail[]>([]);
  if (isLoading) return <p className="noData">Loading</p>;
  if (!emails.length) return <p className="noData">No Emails</p>;

  return (
    <>
      {filteredEmail.map(email => (
        <ListItem
          active={selectedEmail ? email.id === selectedEmail.id : false}
          key={email.id}
          email={email}
          onClick={onSelectEmail}
          onToggleUnread={onToggleUnread}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default ListComponent;
