import React, { FunctionComponent, useCallback, useContext } from "react";

import { EmailContext } from "../../Contexts/emailProvider";

import Header from "./header";
import ListComponent from "./list";

import "./emailList.scss";
import {ICategory, IEmail} from "../../system/interfaces";

interface Props {
  category: ICategory;
  selectedEmail: IEmail | null;
  onSelectEmail(email: IEmail): void;
}

const EmailList: FunctionComponent<Props> = ({
  category,
  selectedEmail,
  onSelectEmail
}: Props) => {
  const { emails, isLoading, toggleUnread, deleteEmail } = useContext(EmailContext);

  const memoOnSelectEmail = useCallback(
    (email: IEmail) => {
      onSelectEmail(email);
      if (email.unread) {
        toggleUnread(email.id);
      }
    },
    [toggleUnread, onSelectEmail]
  );

  return (
    <div className="emailList">
      <Header category={category} />
      <div className="emailList-container">
        <ListComponent
          emails={emails}
          category={category}
          isLoading={isLoading}
          selectedEmail={selectedEmail}
          onSelectEmail={memoOnSelectEmail}
          onToggleUnread={toggleUnread}
          onDelete={deleteEmail}
        />
      </div>
    </div>
  );
};

export default EmailList;
