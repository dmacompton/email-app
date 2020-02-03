import React, { useContext } from "react";

import { ICONS, IEmail } from "../../system/mock/constant";
import { timestampToDate } from "../../system/utils";
import { EmailContext } from "../../Contexts/emailProvider";
import saveToFile from "../../system/saveToFile";

import "./emailContent.scss";

interface Props {
  email: IEmail;
  onClose(): void;
}

const EmailContent = ({ email, onClose }: Props) => {
  const { deleteEmail, toggleUnread } = useContext(EmailContext);

  const handleDeleteEmail = () => {
    deleteEmail(email.id);
    onClose();
  };

  const handleToggleUnread = () => {
    toggleUnread(email.id);
  };

  return (
    <div className="emailContent">
      <div className="emailContent-btnContainer">
        <div className="emailContent-closeBtn" onClick={onClose}>
          ✕
        </div>
        <button className="roundBtn" onClick={handleToggleUnread}>
          {ICONS.unread}
        </button>
        {!email.deleted && (
          <button className="roundBtn" onClick={handleDeleteEmail}>
            {ICONS.trashcan}
          </button>
        )}
        <button
          className="roundBtn"
          onClick={() => {
            saveToFile(email, email.subject);
          }}
        >
          {ICONS.floppy}
        </button>
      </div>
      <p className="emailContent-subject">{email.subject}</p>
      <div className="emailContent-container">
        <div className="firstLine">
          <div className="emailContent-container-from">{email.from}</div>
          <div className="emailContent-container-date">
            {timestampToDate(email.date, true)}
          </div>
        </div>
        <div className="emailContent-container-content">{email.content}</div>
        <div className="emailContent-container-unread">{email.unread}</div>
        <div className="emailContent-container-deleted">{email.deleted}</div>
      </div>
    </div>
  );
};

export default EmailContent;
