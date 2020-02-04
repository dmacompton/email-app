import { IEmail, ICategory } from "../system/interfaces";
import { ACTION_TYPES } from "./actionTypes";

export type Action = {
  type: ACTION_TYPES;
};

interface setEmailsAction extends Action {
  payload: { emails: IEmail[] };
}

interface SetLoadingAction extends Action {
  payload: { isLoading: boolean };
}

interface SetCategoryAction extends Action {
  payload: { category: ICategory };
}

interface SelectEmailAction extends Action {
  payload: { email: IEmail | null };
}

// The Type Guard
export const isSetEmailsAction = (action: Action): action is setEmailsAction =>
  action.type === ACTION_TYPES.SET_EMAILS;

export const isSetLoadingAction = (
  action: Action
): action is SetLoadingAction => action.type === ACTION_TYPES.SET_LOADING;

export const isSetCategoryAction = (
  action: Action
): action is SetCategoryAction => action.type === ACTION_TYPES.SET_CATEGORY;

export const isSelectEmailAction = (
  action: Action
): action is SelectEmailAction => action.type === ACTION_TYPES.SELECT_EMAIL;

// Action Creator
const setEmails = (emails: IEmail[]): setEmailsAction => ({
  type: ACTION_TYPES.SET_EMAILS,
  payload: { emails }
});

const setIsLoading = (isLoading: boolean): SetLoadingAction => ({
  type: ACTION_TYPES.SET_LOADING,
  payload: { isLoading }
});

const setCategory = (category: ICategory): SetCategoryAction => ({
  type: ACTION_TYPES.SET_CATEGORY,
  payload: { category }
});

const selectEmail = (email: IEmail | null): SelectEmailAction => ({
  type: ACTION_TYPES.SELECT_EMAIL,
  payload: { email }
});

export default {
  setEmails,
  setIsLoading,
  setCategory,
  selectEmail
};
