import React, { FunctionComponent, useCallback, MouseEvent } from "react";
import classNames from "classnames";

import { sliceString, timestampToDate } from "../../system/utils";
import { ICONS, IEmail } from "../../system/interfaces";

interface Props {
  email: IEmail;
  active: boolean;
  onClick(email: IEmail): void;
  onToggleUnread(id: IEmail["id"]): void;
  onDelete(id: IEmail["id"]): void;
}

const ListItem: FunctionComponent<Props> = ({
  email,
  active,
  onClick,
  onToggleUnread,
  onDelete
}: Props) => {
  const toggleUnread = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onToggleUnread(email.id);
    },
    [onToggleUnread, email]
  );

  const handleDelete = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      onDelete(email.id);
    },
    [onDelete, email]
  );

  const handleOpen = useCallback(() => {
    onClick(email);
  }, [onClick, email]);

  return (
    <div className={classNames("email", { active })} onClick={handleOpen}>
      {email.unread && <div className="email-unread" />}
      <button className="email-btnToggleUnread" onClick={toggleUnread}>
        {ICONS.unread}
      </button>
      {!email.deleted && (
        <button className="email-btnDelete" onClick={handleDelete}>
          {ICONS.trashcan}
        </button>
      )}
      <div className="email-container">
        <div className="email-from-date">
          <p className="email-from">{sliceString(email.from, 22)}</p>
          <p className="email-date">{timestampToDate(email.date)}</p>
        </div>
        <p className="email-subject">{sliceString(email.subject, 35)}</p>
        <p className="email-content">{sliceString(email.content, 40)}</p>
      </div>
    </div>
  );
};

export default ListItem;
