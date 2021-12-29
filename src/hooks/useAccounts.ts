import { useCallback, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { AccountsAction } from "../reducers/accounts/actions";
import { useAccountsReducer } from "../reducers/accounts/useAccountsReducer";
import { Account } from "../types/account";

export const useAccounts = () => {
  const apiHandler = useContext(ApiContext);

  const [state, dispatch] = useAccountsReducer();

  const fetchAccounts = useCallback(async () => {
    dispatch({ type: AccountsAction.REQUEST });
    const response = await apiHandler.request<{}, Account[]>({
      endpoint: `accounts`,
    });
    console.log("response accounts", response.data);

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
    async (ronin: string) => {
      dispatch({ type: AccountsAction.REQUEST });
      const response = await apiHandler.request<Account, Account>({
        endpoint: `accounts/${ronin}`,
        method: "post",
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
  };
};
