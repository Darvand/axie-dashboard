import React, { useContext, useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { useAccounts } from "../../hooks/useAccounts";

import { AppContext } from "../../store/context";
import AccountDetails from "./components/account-details/AccountDetails";
import AccountsColumn from "./components/accounts-column/AccountsColumn";
import CreateAccount from "./components/create-account/CreateAccount";

interface Props {}

const Accounts = (props: Props) => {
  const { accounts, fetchAccounts, isLoading, error } = useAccounts();
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);
  if (isLoading) return <div>Esta cargando</div>;
  if (error) return <div>Error: {error}</div>;
  console.log("is l;oading", isLoading);
  console.log("it pass here", accounts.length);
  return (
    <div className="flex h-full">
      <AccountsColumn accounts={accounts} />
      <div className=" py-4 px-8 overflow-auto w-full flex justify-center">
        <Switch>
          <Route path={"/accounts/create"} component={CreateAccount} exact />
          <Route
            path={"/accounts/:ronin"}
            render={() => <AccountDetails accounts={accounts} />}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Accounts;
