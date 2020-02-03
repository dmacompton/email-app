import {ICategory, ICONS, IEmail} from "./interfaces";

const junkFilter = ({ from }: IEmail) =>
  from.includes(".biz") || from.includes(".tv");

const inboxFilter = (email: IEmail) => !junkFilter(email) && !email.deleted;

export const CATEGORY_ROUTES: ICategory[] = [
  {
    label: "Inbox",
    icon: ICONS.inbox,
    link: "inbox",
    filter: inboxFilter
  },
  {
    label: "Unread",
    icon: ICONS.unread,
    link: "unread",
    filter: (email: IEmail) => inboxFilter(email) && email.unread
  },
  {
    label: "Read",
    icon: ICONS.read,
    link: "read",
    filter: (email: IEmail) => inboxFilter(email) && !email.unread
  },
  {
    label: "Deleted",
    icon: ICONS.trashcan,
    link: "deleted",
    filter: (email: IEmail) => !junkFilter(email) && email.deleted
  },
  {
    label: "Junk",
    icon: ICONS.junk,
    link: "junk",
    filter: junkFilter
  }
];
