import { useCallback, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { AccountsAction } from "../reducers/accounts/actions";
import { useAccountsReducer } from "../reducers/accounts/useAccountsReducer";
import { AppContext } from "../store/context";
import { Account } from "../types/account";

export const useAccounts = () => {
  const apiHandler = useContext(ApiContext);

  const [state, dispatch] = useAccountsReducer();

  const fetchAccount = useCallback(
    async (accountId): Promise<void> => {
      dispatch({ type: AccountsAction.REQUEST });
      const response = await apiHandler.request<{}, Account>({
        endpoint: `accounts/:accountId`,
        params: { accountId },
      });
      if (response.status === 200) {
        dispatch({
          type: AccountsAction.SUCCESS,
          payload: {
            accounts: [response.data],
          },
        });
        return;
      }
      dispatch({
        type: AccountsAction.ERROR,
        payload: { error: response },
      });
    },
    [apiHandler, dispatch]
  );

  const fetchAccounts = useCallback(async () => {
    console.log("fetch accounts");
    dispatch({ type: AccountsAction.REQUEST });
    const response = await apiHandler.request<{}, Account[]>({
      endpoint: `accounts`,
    });
    if (response.status === 200) {
      dispatch({
        type: AccountsAction.SUCCESS,
        payload: {
          accounts: response.data,
        },
      });
      return;
    }
    dispatch({
      type: AccountsAction.ERROR,
      payload: { error: response },
    });
  }, [apiHandler, dispatch]);

  const createAccount = useCallback(
    async (account: Account) => {
      dispatch({ type: AccountsAction.REQUEST });
      const response = await apiHandler.request<Account, Account>({
        endpoint: `accounts/create`,
        data: account,
      });

      if (response.status === 201) {
        dispatch({
          type: AccountsAction.CREATE_ACCOUNT,
          payload: {
            account: response.data,
          },
        });
        return;
      }
      dispatch({
        type: AccountsAction.ERROR,
        payload: { error: response },
      });
    },
    [apiHandler, dispatch]
  );

  return {
    ...state,
    createAccount,
    fetchAccounts,
    fetchAccount,
  };
};
