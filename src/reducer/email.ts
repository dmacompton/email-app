import { IEmail, ICategory } from "../system/interfaces";
import {
  Action,
  isSetEmailsAction,
  isSetLoadingAction,
  isSelectEmailAction,
  isSetCategoryAction
} from "./actions";

export interface EmailState {
  emails: IEmail[];
  isLoading: boolean;
  activeCategory: ICategory;
  selectedEmail: IEmail | null;
}

export const reducer = (state: EmailState, action: Action): EmailState => {
  if (isSetEmailsAction(action)) {
    return {
      ...state,
      emails: action.payload.emails
    };
  }

  if (isSetLoadingAction(action)) {
    return {
      ...state,
      isLoading: action.payload.isLoading
    };
  }

  if (isSetCategoryAction(action)) {
    return {
      ...state,
      activeCategory: action.payload.category
    };
  }

  if (isSelectEmailAction(action)) {
    return {
      ...state,
      selectedEmail: action.payload.email
    };
  }

  return state;
};
