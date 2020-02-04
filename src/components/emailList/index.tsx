import React, { FunctionComponent, useCallback, useContext } from "react";

import { EmailContext } from "../../Contexts/emailProvider";

import Header from "./header";
import ListComponent from "./list";

import "./emailList.scss";
import { IEmail } from "../../system/interfaces";

const EmailList: FunctionComponent = () => {
  const {
    emails,
    isLoading,
    toggleUnread,
    deleteEmail,
    activeCategory,
    selectedEmail,
    setSelectEmail
  } = useContext(EmailContext);

  const onSelectEmail = useCallback(
    (email: IEmail) => {
      setSelectEmail(email);
      if (email.unread) {
        toggleUnread(email.id);
      }
    },
    [toggleUnread, setSelectEmail]
  );

  return (
    <div className="emailList">
      <Header category={activeCategory} />
      <div className="emailList-container">
        <ListComponent
          emails={emails}
          category={activeCategory}
          isLoading={isLoading}
          selectedEmail={selectedEmail}
          onSelectEmail={onSelectEmail}
          onToggleUnread={toggleUnread}
          onDelete={deleteEmail}
        />
      </div>
    </div>
  );
};

export default EmailList;
