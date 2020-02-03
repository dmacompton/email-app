import React, { FunctionComponent } from "react";

import { CATEGORY_ROUTES, ICONS } from "../../system/mock/constant";
import { useEmailState } from "../../hooks/emailState";
import EmailProvider from "../../Contexts/emailProvider";

import Sidebar from "../sidebar";
import EmailContent from "../emailContent";
import EmailList from "../emailList";

import "./app.css";

const Index: FunctionComponent = () => {
  const {
    activeCategory,
    setActiveCategory,
    selectedEmail,
    setSelectEmail,
    closeEmail
  } = useEmailState();

  return (
    <div className="App">
      <Sidebar
        folders={CATEGORY_ROUTES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="content">
        <EmailProvider>
          <EmailList
            category={activeCategory}
            selectedEmail={selectedEmail}
            onSelectEmail={setSelectEmail}
          />
          {selectedEmail ? (
            <EmailContent email={selectedEmail} onClose={closeEmail} />
          ) : (
            <div className="noMail">{ICONS.mail}</div>
          )}
        </EmailProvider>
      </div>
    </div>
  );
};

export default Index;
