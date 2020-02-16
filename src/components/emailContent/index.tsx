import React, { useCallback, useContext, useEffect } from "react";
import { ipcRenderer } from "electron";

import { timestampToDate } from "../../system/utils";
import { EmailContext } from "../../Contexts/emailProvider";
import saveToFile from "../../system/saveToFile";

import "./emailContent.scss";
import { ICONS } from "../../system/interfaces";

const EmailContent = () => {
  const {
    deleteEmail,
    toggleUnread,
    selectedEmail,
    setSelectEmail
  } = useContext(EmailContext);

  const id = selectedEmail?.id ?? null;
  const unread = selectedEmail?.unread ?? false;

  const handleToggleUnread = useCallback(() => {
    selectedEmail && toggleUnread(selectedEmail.id);
  }, [selectedEmail, toggleUnread]);

  const readInCoupleSeconds = useCallback(
    (id, unread) => {
      console.log("toggleUnread");
      let timerId: NodeJS.Timeout | null = null;
      if (unread) {
        timerId = setTimeout(() => {
          if (unread && id != null) toggleUnread(id);
        }, 500);
      }

      return () => {
        if (timerId) {
          clearTimeout(timerId);
        }
      };
    },
    [toggleUnread]
  );

  useEffect(() => {
    return readInCoupleSeconds(id, unread);
  }, [id, unread, readInCoupleSeconds]);

  const onClose = useCallback(() => {
    setSelectEmail(null);
  }, [setSelectEmail]);

  const handleDeleteEmail = useCallback(() => {
    selectedEmail && deleteEmail(selectedEmail.id);
    onClose();
  }, [selectedEmail, deleteEmail, onClose]);

  const openSeparateWindow = useCallback(() => {
    ipcRenderer.send("show-child", selectedEmail);
  }, [selectedEmail]);

  if (!selectedEmail) return <div className="noMail">{ICONS.mail}</div>;

  return (
    <div className="emailContent">
      <div className="emailContent-btnContainer">
        <div className="emailContent-closeBtn" onClick={onClose}>
          ✕
        </div>
        <button className="roundBtn" onClick={handleToggleUnread}>
          {ICONS.unread}
        </button>
        {!selectedEmail.deleted && (
          <button className="roundBtn" onClick={handleDeleteEmail}>
            {ICONS.trashcan}
          </button>
        )}
        <button
          className="roundBtn"
          onClick={() => {
            saveToFile(selectedEmail, selectedEmail.subject);
          }}
        >
          {ICONS.floppy}
        </button>

        <button className="roundBtn openBtn" onClick={openSeparateWindow}>
          Open in new window
        </button>
      </div>
      <p className="emailContent-subject">{selectedEmail.subject}</p>
      <div className="emailContent-container">
        <div className="firstLine">
          <div className="emailContent-container-from">
            {selectedEmail.from}
          </div>
          <div className="emailContent-container-date">
            {timestampToDate(selectedEmail.date, true)}
          </div>
        </div>
        <div className="emailContent-container-content">
          {selectedEmail.content}
        </div>
        <div className="emailContent-container-unread">
          {selectedEmail.unread}
        </div>
        <div className="emailContent-container-deleted">
          {selectedEmail.deleted}
        </div>
      </div>
    </div>
  );
};

export default EmailContent;
