export enum ICONS {
  pin = "📌",
  inbox = "📥",
  trashcan = "🗑",
  mail = "✉️",
  unread = "📫",
  read = "📪",
  floppy = "💾",
  junk = "⛔️"
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
