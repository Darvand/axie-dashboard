import React from "react";

import Table from "../../components/table/Table";
import { useScholarsAPI } from "../../hooks/useScholarshipsAPI";

interface Props {}

const Scholars = (props: Props) => {
  const { scholars, loading, error } = useScholarsAPI();
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
  if (loading) return <div></div>;
  return (
    <div>
      <Table data={scholars} columns={columns} />
    </div>
  );
};

export default Scholars;
