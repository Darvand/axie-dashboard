import React from "react";
import { useParams } from "react-router-dom";
import { DailyProvider } from "../../../../context/DailyContext";
import AccountDetails from "../account-details/AccountDetails";

const Daily = () => {
  const { ronin } = useParams<{ ronin: string }>();
  return (
    <DailyProvider ronin={ronin}>
      <AccountDetails />
    </DailyProvider>
  );
};

export default Daily;
