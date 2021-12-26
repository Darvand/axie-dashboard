import { Account } from "../../types/account";

export enum AccountsAction {
  REQUEST = "REQUEST_ACCOUNTS",
  ERROR = "ERROR_ACCOUNTS",
  SUCCESS = "SUCCESS_ACCOUNTS",
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
}

export interface RequestAccountsAction {
  type: AccountsAction.REQUEST;
}

export interface SuccessAccountsAction {
  type: AccountsAction.SUCCESS;
  payload: { accounts: Account[] };
}

export interface CreateAccountAction {
  type: AccountsAction.CREATE_ACCOUNT;
  payload: { account: Account };
}

export interface ErrorAccountAction {
  type: AccountsAction.ERROR;
  payload: { error: unknown };
}

export type AccountsActionType =
  | RequestAccountsAction
  | SuccessAccountsAction
  | CreateAccountAction
  | ErrorAccountAction;
