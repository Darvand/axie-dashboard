import React, { useContext, useEffect } from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { AccountsProvider } from "../../context/AccountsContext";
import { DailyProvider } from "../../context/DailyContext";
import { useAccounts } from "../../hooks/useAccounts";

import { AppContext } from "../../store/context";
import AccountDetails from "./components/account-details/AccountDetails";
import AccountsColumn from "./components/accounts-column/AccountsColumn";
import CreateAccount from "./components/create-account/CreateAccount";
import CreateDaily from "./components/create-daily/CreateDaily";
import Daily from "./components/daily/Daily";

interface Props {}

const Accounts = (props: Props) => {
  const { ronin } = useParams<{ ronin: string }>();
  const { isLoading, error } = useAccounts();
  if (isLoading) return <div>Esta cargando</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex h-full justify-center">
      <div
        className=" py-4 overflow-auto flex justify-center w-[830px]"
        style={{ width: "830px" }}
      >
        <DailyProvider ronin={ronin}>
          <Switch>
            <Route path={"/accounts/create"} component={CreateAccount} exact />
            <Route path={"/accounts/:ronin"} component={Daily} />
          </Switch>
        </DailyProvider>
      </div>
    </div>
  );
};

export default Accounts;
