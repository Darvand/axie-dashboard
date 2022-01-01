import React, { useContext, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { FaWallet } from "react-icons/fa";

import Graph from "../../../../components/Graph";
import { AccountResponse } from "../../../../types/requests/account";
import CardContainer from "../card-info/CardContainer";
import Table from "../../../../components/table/Table";
import RowItem from "../card-info/RowItem";
import { SLPIcon } from "../../../../constants/icon";
import { calculateDaily } from "../../../../services/accountDaily";
import { useCallAPI } from "../../../../hooks/useCallAPI";
import { DailyResponse } from "../../../../types/requests/daily";
import DailyActivity from "./daily-activity/DailyActivity";
import { AppContext } from "../../../../store/context";
import { useParams } from "react-router-dom";
import { useDaily } from "../../../../hooks/useDaily";
import { useAccounts } from "../../../../hooks/useAccounts";
import { Account } from "../../../../types/account";
import { useAccountsContext } from "../../../../context/AccountsContext";
import { Daily } from "../../../../types/daily";

const COLUMN_HEADERS = [
  "Dia",
  "SLP Dia",
  "SLP Total",
  "Copas Dia",
  "Copas Total",
  "Precio SLP",
  "USD Total",
  "Victorias",
  "Derrotas",
  "Empates",
  "Aventuras",
];

const dimensions = {
  width: 830,
  height: 340,
  margin: { top: 50, right: 0, bottom: 50, left: 0 },
};

type GraphTypes = "daySLP" | "mmr";

const getDailySLP = (daily: Daily[], key: GraphTypes) => {
  let days = 1;
  const data = [];
  while (days < 16) {
    const date = DateTime.now().minus({ days });
    const dailySLP = daily
      .map((day) => ({ ...day, date: DateTime.fromISO(day.date.toString()) }))
      .find(
        (day) => day.date.day === date.day && day.date.month === date.month
      );
    data.push({ date: date.toFormat("MM/dd"), value: dailySLP?.[key] || 0 });
    days++;
  }
  return data.reverse();
};

const AccountDetails = () => {
  const { accounts } = useAccountsContext();
  const { ronin } = useParams<{ ronin: string }>();
  const { daily, isLoading, error, fetchDaily } = useDaily(ronin);
  useEffect(() => {
    fetchDaily();
  }, [fetchDaily, ronin]);
  const [graph, setGraph] = useState<GraphTypes>("daySLP");
  if (isLoading) return <div>Esta cargando</div>;
  if (error) return <div>Error: {error}</div>;
  const [account] = accounts.filter((acc) => acc.roninAddress === ronin);
  if (!account) return <div></div>;
  const getButtonClassByGraph = (button: GraphTypes) =>
    `w-20 rounded py-1 ${
      graph === button ? "text-active border border-active" : "hover:font-bold"
    }`;
  const graphSLPData = getDailySLP(daily, "daySLP");
  const graphMMRData = getDailySLP(daily, "mmr");
  console.log("graphSLPData", graphSLPData);
  return (
    <div className="">
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col">
          <h1 className="text-2xl text-active">
            {account.scholar?.name || "Sin asociar"}
          </h1>
          <h2 className="text-secondary-text text-base">
            {account.roninAddress}
          </h2>
        </div>
        <div className="flex gap-8">
          <CardContainer title="Porcentaje de pago" value="40" unit="%" />
          <CardContainer title="Promedio diario" value="120" unit="SLP" />
          <CardContainer title="Proximo pago" value="1500" unit="SLP" special />
        </div>
        <section>
          <div className="flex gap-2 text-sm text-primary-text">
            <button
              className={getButtonClassByGraph("daySLP")}
              onClick={() => setGraph("daySLP")}
            >
              SLP
            </button>
            <button
              className={getButtonClassByGraph("mmr")}
              onClick={() => setGraph("mmr")}
            >
              MMR
            </button>
          </div>
          {
            <Graph
              dimensions={dimensions}
              data={graph === "daySLP" ? graphSLPData : graphMMRData}
              valueKey={graph}
              yAxisLabel={graph.toUpperCase()}
            />
          }
        </section>
      </div>
      <DailyActivity daily={daily} ronin={account.roninAddress} />
    </div>
  );
};

export default AccountDetails;
