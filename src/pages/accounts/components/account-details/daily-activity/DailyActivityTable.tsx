import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import Table from "../../../../../components/table/Table";
import { useCallAPI } from "../../../../../hooks/useCallAPI";
import { DailyResponse } from "../../../../../types/requests/daily";
import { DailyWithDateString } from "./DailyActivity";

type setDataType = (old: DailyWithDateString[]) => DailyWithDateString[];

interface Props {
  data: DailyWithDateString[];
  setData: (fn: setDataType) => void;
  ronin: string;
}

const DailyActivityTable = ({ data, setData, ronin }: Props) => {
  const url = `accounts/${ronin}/daily`;
  const { res, callAPI } = useCallAPI({ url, method: "put" });
  const { res: resPost, callAPI: callPostDaily } = useCallAPI<DailyResponse>({
    url,
    method: "post",
  });
  const [skipPageReset, setSkipPageReset] = useState(false);
  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);
  const updateData = (rowIndex: number, columnId: string, value: any) => {
    setSkipPageReset(true);
    setData(
      (old: DailyWithDateString[]) =>
        old &&
        old.map((row, index) => {
          if (index === rowIndex && value !== (row as any)[columnId]) {
            const newRow = {
              ...old[rowIndex],
              [columnId]: value,
            };
            callAPI(newRow);
            return newRow;
          }
          return row;
        })
    );
  };

  useEffect(() => {
    if (resPost.data) {
      console.log("res data", resPost.data);
      setData((old) =>
        [
          ...old,
          {
            ...resPost.data,
            date: DateTime.fromISO(resPost.data!.date.toString()).toISODate(),
          } as DailyWithDateString,
        ]
          .map((day) => ({
            ...day,
            date: DateTime.fromISO(day.date.toString()),
          }))
          .sort((prev, next) => next.date.toMillis() - prev.date.toMillis())
          .map((day) => ({
            ...day,
            date: day.date.toISODate(),
          }))
      );
    }
  }, [resPost.data]);

  const onSubmit = (data: any) => {
    console.log("add button", data);
    callPostDaily(data);
  };
  return (
    <Table
      columns={[
        { Header: "Dia", accessor: "date" },
        { Header: "SLP", accessor: "daySLP" },
        { Header: "En Axie", accessor: "inGameSLP" },
        { Header: "Total", accessor: "lifetimeSLP" },
        { Header: "Copas", accessor: "dayMMR" },
        { Header: "MMR Total", accessor: "mmr" },
        { Header: "Victorias", accessor: "pvpWin" },
        { Header: "Derrotas", accessor: "pvpLose" },
        { Header: "Empates", accessor: "pvpDraw" },
      ]}
      data={data}
      updateData={updateData}
      skipPageReset={skipPageReset}
      onInsert={onSubmit}
    />
  );
};

export default DailyActivityTable;
