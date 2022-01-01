import { Dispatch } from "react";
import { Account } from "../../types/account";
import { useApiReducer } from "../api/useApiReducer";
import { AccountsAction, AccountsActionType } from "./actions";

export interface AccountsState {
  error: unknown;
  isLoading: boolean;
  accounts: Account[];
}

export const initialState: AccountsState = {
  error: null,
  isLoading: false,
  accounts: [],
};

export const reducer = (
  state: AccountsState,
  action: AccountsActionType
): AccountsState => {
  switch (action.type) {
    case AccountsAction.REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case AccountsAction.SUCCESS: {
      const { accounts } = action.payload;
      return {
        ...state,
        isLoading: false,
        accounts,
      };
    }
    case AccountsAction.CREATE_ACCOUNT: {
      const { account } = action.payload;
      const accounts = [...state.accounts, account];
      console.log(
        "last accounts",
        state.accounts.length,
        "new accounts",
        accounts.length
      );
      return {
        ...state,
        isLoading: false,
        accounts: accounts.sort((prev, next) => prev.mmr - next.mmr),
      };
    }
    case AccountsAction.ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        error,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export const useAccountsReducer = (): [
  AccountsState,
  Dispatch<AccountsActionType>
] => {
  return useApiReducer(reducer, initialState);
};
