import React, { useState } from "react";
import { DateTime } from "luxon";

import { DailyResponse } from "../../../../../types/requests/daily";
import DailyActivityTable from "./DailyActivityTable";

interface Props {
  daily: DailyResponse[];
  ronin: string;
}

export interface DailyWithDateString extends Omit<DailyResponse, "date"> {
  date: string;
}

const createData = (daily: DailyResponse[]) =>
  daily
    .map((day) => ({
      ...day,
      date: DateTime.fromISO(day.date.toString()),
    }))
    .sort((prev, next) => next.date.toMillis() - prev.date.toMillis())
    .map((day) => ({
      ...day,
      date: day.date.toISODate(),
    }));

const DailyActivity = ({ daily, ronin }: Props) => {
  const [data, setData] = useState<DailyWithDateString[]>(createData(daily));
  return (
    <section className="mt-10 flex flex-col text-primary-text">
      <DailyActivityTable data={data} setData={setData} ronin={ronin} />
    </section>
  );
};

export default DailyActivity;
