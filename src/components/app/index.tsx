import React, { FunctionComponent } from "react";

import EmailProvider from "../../Contexts/emailProvider";

import Sidebar from "../sidebar";
import EmailContent from "../emailContent";
import EmailList from "../emailList";

import { CATEGORY_ROUTES } from "../../system/filters";

import "./app.scss";

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <EmailProvider>
        <Sidebar folders={CATEGORY_ROUTES} />
        <div className="content">
          <EmailList />
          <EmailContent />
        </div>
      </EmailProvider>
    </div>
  );
};

export default App;
