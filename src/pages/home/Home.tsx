import { DateTime, Interval } from "luxon";
import React, { useContext, useEffect, useState } from "react";
import Graph from "../../components/Graph";
import Table from "../../components/table/Table";
import Card from "../../components/card/Card";
import { SLPIcon } from "../../constants/icon";
import { calculateDaily } from "../../services/accountDaily";
import { nextFortnightPayment } from "../../services/payments";
import { AppContext } from "../../store/context";
import { AccountSummary } from "../../types/headers";
import { AccountResponse } from "../../types/requests/account";
import CardHeader from "../../components/card/CardHeader";
import Coin from "../../components/card/Coin";
import CardBody from "../../components/card/CardBody";
import { getNextFortnight } from "../../helpers/time";
import { useAccounts } from "../../hooks/useAccounts";

interface Props {}

const dimensions = {
  width: 800,
  height: 400,
  margin: { top: 30, right: 50, bottom: 30, left: 10 },
};

const getDailyProduction = (accounts: AccountResponse[]) => {
  let today = DateTime.utc();
  const dailyAverage: { average: number; date: number }[] = [];
  const largeDaily = accounts.reduce(
    (max, current) =>
      current.accountDaily.length > max ? current.accountDaily.length : max,
    0
  );
  Array(largeDaily > 30 ? 30 : largeDaily)
    .fill({})
    .forEach((_, index) => {
      const day = today.minus({ days: index + 2 });
      const days = accounts
        .map((account) =>
          account.accountDaily.filter((daily) => {
            const date = DateTime.fromISO(daily.date.toString());
            const interval = Interval.fromDateTimes(day, date);
            return interval.length("days") < 1;
          })
        )
        .filter((daily) => daily.length > 0)
        .map((daily) => daily[0]);
      const average = days.reduce((accum, day) => accum + day.daySLP, 0);
      dailyAverage.push({ average, date: day.toMillis() });
    });
  return dailyAverage;
};

const Home = (props: Props) => {
  const { accounts, fetchAccounts, isLoading, error } = useAccounts();
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);
  const slpPrice = 0.03;
  const rows = accounts.reduce<AccountSummary[]>((accum, account) => {
    accum.push(calculateDaily(account, []));
    return accum;
  }, []);
  const [isOnlyFortnight, setIsOnlyFortnight] = useState(false);
  const dailyProduction = getDailyProduction([]);
  const paymentCalc = nextFortnightPayment(rows);
  const { expectedOwnSLP, expectedToPaySLP, toPaySLP, ownSLP } =
    paymentCalc.nextPayment;
  if (isLoading) return <div>Esta cargando</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="py-6 px-10 flex flex-col gap-2">
      <span className="text-4xl font-bold text-primary-text">Inicio</span>
      <section className="flex gap-4 items-center justify-around">
        <Card title={paymentCalc.nextPaymentDate.toFormat("yyyy LLL dd")}>
          <CardHeader>
            <Coin
              symbol="SLP"
              quantity={ownSLP}
              priceUSD={slpPrice}
              size="text-4xl"
              contrastColor="text-third"
            />
            <div>{SLPIcon(14)}</div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {[
                ["Estimado Propio", expectedOwnSLP],
                ["Por pagar", toPaySLP],
                ["Estimado por pagar", expectedToPaySLP],
              ].map(([label, quantity]) => (
                <>
                  <span className="text-base text-right self-center">
                    {label}
                  </span>
                  <Coin symbol="SLP" quantity={+quantity} priceUSD={slpPrice} />
                </>
              ))}
            </div>
          </CardBody>
        </Card>
        <section>
          <h1 className="text-2xl font-bold text-primary-text">
            Produccion diaria SLP Ultimos 30 dias
          </h1>
          <Graph
            dimensions={dimensions}
            data={dailyProduction}
            valueKey="average"
            yAxisLabel="SLP"
          />
        </section>
      </section>
      <section className="mt-10 flex flex-col gap-10 p-4">
        <div className="flex gap-4">
          <button className="p-4 bg-active text-primary-text font-bold text-lg w-48 rounded-lg">
            Agregar cuenta
          </button>
          <button
            className="group w-48 bg-primary text-primary-text text-lg flex justify-center items-center gap-2"
            onClick={() => setIsOnlyFortnight(!isOnlyFortnight)}
          >
            <span
              className={`w-4 h-4 border border-solid border-active group-hover:bg-third ${
                isOnlyFortnight && "bg-active"
              }`}
            ></span>
            <p>Esta quincena</p>
          </button>
        </div>
        <Table
          columns={[
            { Header: "Direccion", accessor: "ronin" },
            { Header: "Becado", accessor: "scholarship" },
            { Header: "Ronin", accessor: "roninSLP" },
            { Header: "Juego", accessor: "inGameSLP" },
            { Header: "Siempre", accessor: "lifetimeSLP" },
            { Header: "Copas", accessor: "mmr" },
            { Header: "Promedio", accessor: "averageSLP" },
            { Header: "Ayer", accessor: "yesterdaySLP" },
            { Header: "%", accessor: "paymentProportion" },
            { Header: "Proximo Pago", accessor: "nextPayment" },
            { Header: "Ultimo Retiro", accessor: "lastClaim" },
            { Header: "Proximo Retiro", accessor: "nextClaim" },
          ]}
          data={rows
            .map((row) => ({
              ...row,
              paymentProportion: `${row.paymentProportion * 100}%`,
            }))
            .filter((row) => {
              if (!isOnlyFortnight) return true;
              const nextFortnight = getNextFortnight(DateTime.now());
              return DateTime.fromISO(row.nextClaim) <= nextFortnight;
            })}
        />
      </section>
    </div>
  );
};

export default Home;
