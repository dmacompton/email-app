import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FunctionComponent
} from "react";
import { IEmail } from "../system/mock/constant";

interface EmailContext {
  emails: IEmail[];
  isLoading: boolean;
  deleteEmail(id: IEmail["id"]): void;
  toggleUnread(id: IEmail["id"]): void;
}

export const EmailContext = createContext<EmailContext>({
  emails: [],
  isLoading: false,
  deleteEmail: id => {
    throw new Error("deleteEmail() not implemented");
  },
  toggleUnread: id => {
    throw new Error("toggleUnread() not implemented");
  }
});

interface EmailProviderProps {
  children: ReactNode;
}

const EmailProvider: FunctionComponent<EmailProviderProps> = ({
  children
}: EmailProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emails, setEmails] = useState<IEmail[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.myjson.com/bins/ri3em")
      .then(resp => {
        if (resp.ok) return resp.json();
        throw new Error(`HTTP status ${resp.status}`);
      })
      .then(data => {
        setEmails(data as IEmail[]);
      })
      .catch(e => {
        console.error(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const toggleUnread = (id: IEmail["id"]) => {
    const updatedEmails = emails.map(email =>
      email.id === id ? { ...email, unread: !email.unread } : email
    );
    setEmails(updatedEmails);
  };

  const deleteEmail = (id: IEmail["id"]) => {
    const updatedEmails = emails.map(email =>
      email.id === id ? { ...email, deleted: true } : email
    );
    setEmails(updatedEmails);
  };


  return (
    <EmailContext.Provider
      value={{ emails, isLoading, deleteEmail, toggleUnread }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export default EmailProvider;
