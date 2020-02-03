export enum ICONS {
  pin = "📌",
  inbox = "📥",
  trashcan = "🗑",
  mail = "✉️",
  unread = "📫",
  read = "📪",
  floppy = "💾"
}

export interface ICategory {
  label: string;
  icon: ICONS;
  link: string;
  filter(email: IEmail): boolean;
}

export interface IEmail {
  id: string;
  date: number;
  from: string;
  subject: string;
  content: string;
  unread: boolean;
  deleted: boolean;
}

export const CATEGORY_ROUTES: ICategory[] = [
  {
    label: "Inbox",
    icon: ICONS.inbox,
    link: "inbox",
    filter: (email: IEmail) => !email.deleted
  },
  {
    label: "Unread",
    icon: ICONS.unread,
    link: "unread",
    filter: (email: IEmail) => !email.deleted && email.unread
  },
  {
    label: "Read",
    icon: ICONS.read,
    link: "read",
    filter: (email: IEmail) => !email.deleted && !email.unread
  },
  {
    label: "Deleted",
    icon: ICONS.trashcan,
    link: "deleted",
    filter: (email: IEmail) => email.deleted
  }
];

export const DEFAULT_TAB = CATEGORY_ROUTES[0];
