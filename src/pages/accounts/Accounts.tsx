import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../../store/context";
import AccountDetails from "./components/AccountDetails";
import AccountsColumn from "./components/accounts-column/AccountsColumn";

interface Props {}

const Accounts = (props: Props) => {
  const { state } = useContext(AppContext);
  const { ronin } = useParams<{ ronin: string }>();
  const accountRequested = state.accounts.find(
    (account) => account.roninAddress === ronin
  );
  return (
    <div className="flex h-full">
      <AccountsColumn accounts={state.accounts} />
      <div className=" py-4 px-8 overflow-auto w-full flex justify-center">
        {accountRequested && <AccountDetails account={accountRequested} />}
      </div>
    </div>
  );
};

export default Accounts;
