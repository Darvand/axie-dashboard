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
  isLoading: true,
  accounts: [],
};

export const reducer = (
  state: AccountsState,
  action: AccountsActionType
): AccountsState => {
  switch (action.type) {
    case AccountsAction.SUCCESS: {
      const { accounts } = action.payload;
      return {
        ...state,
        accounts,
      };
    }
    case AccountsAction.CREATE_ACCOUNT: {
      const { account } = action.payload;
      const accounts = [...state.accounts, account];
      return {
        ...state,
        accounts: accounts.sort((prev, next) => prev.mmr - next.mmr),
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
