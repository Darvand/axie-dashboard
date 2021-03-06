import React from "react";
import { useHistory, useParams } from "react-router";
import { Account } from "../../../../types/account";

interface Props {
  account: Account;
}

const AccountCard = ({ account }: Props) => {
  const { ronin } = useParams<{ ronin: string }>();
  const history = useHistory();
  const isSelected = account.roninAddress === ronin;
  const roninWithoutPrefix = account.roninAddress
    .replace("ronin:", "")
    .replace("0x", "");
  const first5LettersRonin = roninWithoutPrefix.substring(0, 5);
  const last5LettersRonin = roninWithoutPrefix.substring(
    roninWithoutPrefix.length - 5,
    roninWithoutPrefix.length
  );
  console.log("account", account);
  return (
    <div
      className={`group w-full px-4 py-2 text-primary-text cursor-pointer flex flex-col gap-2 hover:bg-active ${
        isSelected ? "bg-active" : "bg-primary"
      }`}
      onClick={() => history.push(`/accounts/${account.roninAddress}`)}
    >
      <div className="flex gap-2 text-2xl font-bold">
        <span>{account.inGameSLP}</span>
        <span>SLP</span>
      </div>
      <div className=" flex flex-col">
        <h1 className="text-primary-text text-lg">
          {account.scholar?.name || "Sin asociar"}
        </h1>
        <p
          className={`text-base group-hover:text-primary-text ${
            isSelected ? "text-primary-text " : "text-secondary-text "
          }`}
        >{`ronin:${first5LettersRonin}...${last5LettersRonin}`}</p>
      </div>
    </div>
  );
};

export default AccountCard;
