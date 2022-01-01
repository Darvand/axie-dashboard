import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../../../../components/modal/Modal";
import Table from "../../../../../components/table/Table";
import CreateDaily from "../../create-daily/CreateDaily";
import { DailyWithDateString } from "./DailyActivity";

type setDataType = (old: DailyWithDateString[]) => DailyWithDateString[];

interface Props {
  data: DailyWithDateString[];
  setData: (fn: setDataType) => void;
  ronin: string;
}

const DailyActivityTable = ({ data, ronin }: Props) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <CreateDaily />
      </Modal>
      <Table
        columns={[
          { Header: "Dia", accessor: "date" },
          { Header: "SLP", accessor: "daySLP" },
          { Header: "En el juego", accessor: "inGameSLP" },
          { Header: "Copas/Dia", accessor: "dayMMR" },
          { Header: "MMR", accessor: "mmr" },
        ]}
        data={data}
        onCreate={() => setShowModal(true)}
      />
    </>
  );
};

export default DailyActivityTable;
