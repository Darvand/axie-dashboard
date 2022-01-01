import { createContext, ReactElement, useContext, useEffect } from "react";
import { useAccounts } from "../hooks/useAccounts";
import { initialState } from "../reducers/accounts/useAccountsReducer";

interface AccountsProviderProps {
  children: ReactElement;
}

export const AccountsContext = createContext(initialState);

export const useAccountsContext = () => useContext(AccountsContext);

export const AccountsProvider = ({ children }: AccountsProviderProps) => {
  const { fetchAccounts, isLoading, ...useAccountsResult } = useAccounts();
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);
  if (isLoading) <div>cuentas cargando</div>;
  return (
    <AccountsContext.Provider value={{ isLoading, ...useAccountsResult }}>
      {children}
    </AccountsContext.Provider>
  );
};
