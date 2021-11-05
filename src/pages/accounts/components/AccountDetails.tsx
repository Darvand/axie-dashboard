import React, { useState } from "react";
import { DateTime, Interval } from "luxon";
import { FaWallet } from "react-icons/fa";

import Graph from "../../../components/Graph";
import { AccountResponse } from "../../../types/requests/account";
import CardContainer from "./card-info/CardContainer";
import Table from "../../../components/table/Table";
import RowItem from "./card-info/RowItem";

const ImageSLP = (
  <img
    src="https://marketplace.axieinfinity.com/static/image/love-potion.png"
    alt="SLP Icon"
    className="w-10"
  />
);

interface Props {
  account: AccountResponse;
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

const AccountDetails = ({ account }: Props) => {
  const [graph, setGraph] = useState<GraphTypes>("slp");
  if (!account) return <div></div>;
  const getButtonClassByGraph = (button: GraphTypes) =>
    `w-20 rounded py-1 ${
      graph === button ? "font-bold bg-active" : "hover:font-bold"
    }`;
  const dailyAccount = account.accountDaily.sort(
    (prev, next) => next.totalSLP - prev.totalSLP
  );
  const nextClaim = DateTime.fromMillis(dailyAccount[0].nextClaim * 1000);
  const lastClaim = DateTime.fromMillis(dailyAccount[0].lastClaim * 1000);
  const isPayable = DateTime.now() > nextClaim;
  const intervalBetweenClaims = Interval.fromDateTimes(
    lastClaim,
    DateTime.now()
  );
  const daysBetweenClaims = Math.floor(intervalBetweenClaims.length("days"));
  const totalSLPBetweenClaims = dailyAccount
    .slice(
      0,
      daysBetweenClaims > dailyAccount.length
        ? dailyAccount.length - 1
        : daysBetweenClaims
    )
    .map((daily, index) => daily.totalSLP - dailyAccount[index + 1].totalSLP)
    .reduce((accum, current) => accum + current, 0);
  const averageSLPBetweenClaims = totalSLPBetweenClaims / daysBetweenClaims;
  const dailySLP = account.accountDaily
    .reverse()
    .map((daily, index) => ({
      slp: daily.totalSLP - dailyAccount[index - 1]?.totalSLP || 0,
      mmr: daily.mmr,
      date: DateTime.fromISO(daily.createAt).toMillis(),
    }))
    .sort((prev, next) => prev.date - next.date);
  return (
    <div className="">
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col">
          <h1 className="text-4xl text-primary-text font-bold">Account 1</h1>
          <h2 className="text-secondary-text text-base">
            {account.roninAddress}
          </h2>
        </div>
        <div className="flex gap-8">
          <CardContainer
            Icon={ImageSLP}
            title="Promedio"
            titleValue={`${Math.floor(averageSLPBetweenClaims)} SLP`}
            rows={[
              <RowItem
                title="Total generado"
                value={`${account.accountDaily[0].totalSLP} SLP`}
              />,
              <RowItem
                title="En ronin"
                value={`${account.accountDaily[0].totalRoninSLP} SLP`}
              />,
              <RowItem
                title="En juego"
                value={`${account.accountDaily[0].inGameSLP} SLP`}
              />,
            ]}
          />
          <CardContainer
            Icon={<FaWallet className="text-secondary-text text-3xl" />}
            title="Pago"
            titleValue={`${Math.floor(
              account.accountDaily[0].totalSLP / 2
            )} SLP`}
            rows={[
              <RowItem
                title="Proximo pago"
                value={
                  isPayable ? "Disponible" : nextClaim.toFormat("yyyy-MM-dd")
                }
                isStatus={isPayable}
              />,
              <RowItem
                title="Ultimo pago"
                value={lastClaim.toFormat("yyyy-MM-dd")}
              />,
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
      <section className="mt-10 flex flex-col gap-10">
        <h1 className="text-2xl font-bold text-primary-text">
          Actividad diaria
        </h1>
        <Table
          headers={["Dia", "SLP", "SLP Total", "Copas", "MMR Total", "V/D/E"]}
          data={account.accountDaily.reverse().map((daily, index) => {
            const slp = `${
              daily.totalSLP - dailyAccount[index + 1]?.totalSLP ||
              daily.totalSLP
            }`;
            const coups = `${
              daily.mmr - dailyAccount[index + 1]?.mmr || daily.mmr
            }`;
            return {
              day: DateTime.fromISO(daily.createAt).toFormat("yyyy-MM-dd"),
              slp,
              totalSLP: `${daily.totalSLP}`,
              coups,
              mmr: `${daily.mmr}`,
              matchStats: `${daily.pvpWin}/${daily.pvpLose}/${daily.pvpDraw}`,
            };
          })}
        />
      </section>
    </div>
  );
};

export default AccountDetails;
