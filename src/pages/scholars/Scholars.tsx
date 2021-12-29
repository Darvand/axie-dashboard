import React, { useEffect } from "react";

import Table from "../../components/table/Table";
import { useScholars } from "../../hooks/useScholars";
import { useScholarsAPI } from "../../hooks/useScholarshipsAPI";
import CreateScholar from "./CreateScholar";

interface Props {}

const Scholars = (props: Props) => {
  const { scholars, fetchScholars, isLoading, error } = useScholars();
  useEffect(() => {
    fetchScholars();
  }, [fetchScholars]);
  const columns = [
    {
      Header: "Becado",
      accessor: "name",
    },
    {
      Header: "Ronin",
      accessor: "paymentRoninAddress",
    },
    {
      Header: "Fecha inicio",
      accessor: "entryDate",
    },
  ];
  if (isLoading) return <div></div>;
  if (error) return <div>error: {error}</div>;
  return (
    <div>
      <CreateScholar />
      <Table data={scholars} columns={columns} />
    </div>
  );
};

export default Scholars;
