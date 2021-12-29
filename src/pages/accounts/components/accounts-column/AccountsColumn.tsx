import React, { useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useAccountsContext } from "../../../../context/AccountsContext";
import AccountCard from "./AccountCard";
import Dropdown from "./Dropdown";

const AccountsColumn = () => {
  const { accounts } = useAccountsContext();
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const history = useHistory();
  const addGroupToSearch = (group: string) => {
    if (selectedGroups.some((selected) => selected === group)) {
      return;
    }
    setSelectedGroups([...selectedGroups, group]);
  };
  const removeGroupToSearch = (group: string) => {
    const newGroups = selectedGroups.filter((selected) => selected !== group);
    setSelectedGroups(newGroups);
  };

  return (
    <div
      className="bg-secondary min-h-full w-80 px-8 py-4"
      style={{ height: "fit-content" }}
    >
      <div className="h-full w-full flex flex-col gap-4">
        <Dropdown
          options={["Mis cuentas", "Del otro", "Del amigo"]}
          selected={selectedGroups}
          onClick={addGroupToSearch}
          onRemove={removeGroupToSearch}
        />
        <div
          className="w-full px-4 py-4 bg-primary text-primary-text
            cursor-pointer text-xl flex justify-center hover:bg-active"
          onClick={() => history.replace("/accounts/create")}
        >
          <AiOutlinePlus />
        </div>
        {accounts.map((account) => {
          return <AccountCard account={account} key={account.roninAddress} />;
        })}
      </div>
    </div>
  );
};

export default AccountsColumn;
