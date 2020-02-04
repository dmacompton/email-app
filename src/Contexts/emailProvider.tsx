import React, {
  createContext,
  useEffect,
  useReducer,
  ReactNode,
  FunctionComponent,
  useCallback
} from "react";
import { ipcRenderer } from "electron";

import { IEmail, ICategory } from "../system/interfaces";
import { EmailState, reducer } from "../reducer/email";
import Actions from "../reducer/actions";
import { DEFAULT_TAB } from "../system/constant";

interface EmailContext extends EmailState {
  deleteEmail(id: IEmail["id"]): void;
  toggleUnread(id: IEmail["id"]): void;
  setActiveCategory(category: ICategory): void;
  setSelectEmail(email: IEmail | null): void;
}

const initialState: EmailState = {
  emails: [],
  isLoading: false,
  activeCategory: DEFAULT_TAB,
  selectedEmail: null
};

export const EmailContext = createContext<EmailContext>({
  ...initialState,
  deleteEmail: id => {
    throw new Error("deleteEmail() not implemented");
  },
  toggleUnread: id => {
    throw new Error("toggleUnread() not implemented");
  },
  setActiveCategory: category => {
    throw new Error("setActiveCategory() not implemented");
  },
  setSelectEmail: email => {
    throw new Error("setSelectEmail() not implemented");
  }
});

interface EmailProviderProps {
  children: ReactNode;
}

const EmailProvider: FunctionComponent<EmailProviderProps> = ({
  children
}: EmailProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState
  });

  const { emails, isLoading, activeCategory, selectedEmail } = state;

  const setIsLoading = useCallback((isLoading: boolean) => {
    dispatch(Actions.setIsLoading(isLoading));
  }, []);
  const setEmails = useCallback((emails: IEmail[]) => {
    dispatch(Actions.setEmails(emails));
  }, []);
  const setActiveCategory = (category: ICategory) => {
    dispatch(Actions.setCategory(category));
  };
  const setSelectEmail = (email: IEmail | null) => {
    dispatch(Actions.selectEmail(email));
  };

  const toggleUnread = useCallback(
    (id: IEmail["id"]) => {
      const updatedEmails = emails.map(email =>
        email.id === id ? { ...email, unread: !email.unread } : email
      );
      setEmails(updatedEmails);
    },
    [setEmails, emails]
  );

  const deleteEmail = useCallback(
    (id: IEmail["id"]) => {
      const updatedEmails = emails.map(email =>
        email.id === id ? { ...email, deleted: true } : email
      );
      setEmails(updatedEmails);
    },
    [setEmails, emails]
  );

  useEffect(() => {
    setIsLoading(true);

    ipcRenderer.on(
      "async-reply",
      (event: Electron.IpcRendererEvent, emails: IEmail[]) => {
        setEmails(emails);
        setIsLoading(false);
      }
    );

    ipcRenderer.on("async-reply-error", () => {
      alert("Fetch error");
      setIsLoading(false);
    });

    ipcRenderer.send("async-message", ["compton", "hi from frontend"]);
  }, [setEmails, setIsLoading]);

  return (
    <EmailContext.Provider
      value={{
        emails,
        isLoading,
        deleteEmail,
        toggleUnread,
        activeCategory,
        selectedEmail,
        setActiveCategory,
        setSelectEmail
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export default EmailProvider;
