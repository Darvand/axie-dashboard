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

interface Props {
  accounts: Account[];
}

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

COLUMN_HEADERS.reduce((accum, item) => {
  if (item.match(/.Nike./)) {
    accum++;
  }
  return accum;
}, 0);

const dimensions = {
  width: 800,
  height: 400,
  margin: { top: 30, right: 50, bottom: 30, left: 10 },
};

type GraphTypes = "slp" | "mmr";

const AccountDetails = ({ accounts }: Props) => {
  const { ronin } = useParams<{ ronin: string }>();
  const { daily, isLoading, error, fetchDaily } = useDaily(ronin);
  useEffect(() => {
    fetchDaily();
  }, [fetchDaily, ronin]);
  const [graph, setGraph] = useState<GraphTypes>("slp");
  if (isLoading) return <div>Esta cargando</div>;
  if (error) return <div>Error: {error}</div>;
  console.log("daily", daily, ronin);
  const [account] = accounts.filter((acc) => acc.roninAddress === ronin);
  const accountDetail = calculateDaily(account, daily);
  if (!account) return <div></div>;
  const getButtonClassByGraph = (button: GraphTypes) =>
    `w-20 rounded py-1 ${
      graph === button ? "font-bold bg-active" : "hover:font-bold"
    }`;
  const isPayable =
    DateTime.now() > DateTime.fromFormat(accountDetail.lastClaim, "yyyy-MM-dd");
  const dailySLP = daily
    .map((d) => ({
      slp: d.daySLP,
      mmr: d.dayMMR,
      date: DateTime.fromISO(d.date.toString()).toMillis(),
    }))
    .sort((prev, next) => prev.date - next.date);
  return (
    <div className="">
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col">
          <h1 className="text-4xl text-primary-text font-bold">
            {account.scholar.name}
          </h1>
          <h2 className="text-secondary-text text-base">
            {account.roninAddress}
          </h2>
        </div>
        <div className="flex gap-8">
          <CardContainer
            Icon={SLPIcon}
            title="Promedio"
            titleValue={`${accountDetail.averageSLP} SLP`}
            rows={[
              <RowItem
                title="En ronin"
                value={`${accountDetail.roninSLP} SLP`}
              />,
              <RowItem
                title="En juego"
                value={`${accountDetail.inGameSLP} SLP`}
              />,
            ]}
          />
          <CardContainer
            Icon={<FaWallet className="text-secondary-text text-3xl" />}
            title="Pago"
            titleValue={`${accountDetail.nextPayment} SLP`}
            rows={[
              <RowItem
                title="Proximo pago"
                value={isPayable ? "Disponible" : accountDetail.nextClaim}
                isStatus={isPayable}
              />,
              <RowItem title="Ultimo pago" value={accountDetail.lastClaim} />,
            ]}
          />
        </div>
        <section>
          <div className="flex gap-2 text-base text-primary-text">
            <button
              className={getButtonClassByGraph("slp")}
              onClick={() => setGraph("slp")}
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
              data={dailySLP}
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
