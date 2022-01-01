import React, { useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import { MdModeEditOutline, MdNavigateNext } from "react-icons/md";
import { Row, usePagination, useTable } from "react-table";

interface Props {
  data: any[];
  columns: { Header: string; accessor: string }[];
  onCreate?: () => void;
  onDelete?: (value: any) => void;
  onEdit?: (value: any) => void;
}

interface ActionCellProps {
  onDelete: (value: any) => void;
  onEdit: (value: any) => void;
  value: any;
}

const ActionCell = ({ onDelete, onEdit, value }: ActionCellProps) => {
  return (
    <div className="flex gap-5">
      <MdModeEditOutline
        onClick={() => onEdit(value)}
        className="text-lg cursor-pointer hover:text-active"
      />
      <FaTrash
        onClick={() => onDelete(value)}
        className="text-lg cursor-pointer hover:text-active"
      />
    </div>
  );
};

const Table = ({
  data,
  columns,
  onCreate = () => null,
  onDelete = () => null,
  onEdit = () => null,
}: Props) => {
  const memoData = useMemo(() => data, [data]);
  const memoColumns = useMemo(
    () => [
      ...columns,
      {
        Header: "Accion",
        accesor: "action",
        Cell: ({ original }: Row) => (
          <ActionCell onDelete={onDelete} onEdit={onEdit} value={original} />
        ),
      },
    ],
    [columns]
  );
  const tableInstance = useTable(
    {
      columns: memoColumns,
      data: memoData,
      initialState: { pageSize: 15 },
    },
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
  } = tableInstance;
  return (
    <div>
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={`bg-secondary text-sm text-primary-text grid grid-cols-${headerGroup.headers.length} px-3 h-14 flex justify-center items-center`}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-primary-text text-sm">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`h-14 px-3 group
                border border-primary rounded
                hover:border-primary-text 
                hover:bg-primary-text hover:bg-opacity-10
                grid grid-cols-${row.cells.length}`}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="flex justify-center items-center"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-14 flex justify-between items-center w-full px-3">
        <button
          className="border border-active text-active text-sm px-3 w-36 rounded h-8"
          onClick={() => onCreate()}
        >
          Nuevo registro
        </button>
        <div className="flex items-center justify-between gap-4 mr-4">
          <button
            className=" h-8 text-active flex justify-center items-center"
            style={{ transform: "scaleX(-1)" }}
            onClick={() => previousPage()}
          >
            <MdNavigateNext className="text-active text-3xl cursor-pointer" />
          </button>
          <span className="">
            {pageIndex + 1} de {pageOptions.length}
          </span>
          <button
            className=" h-8 text-active flex justify-center items-center"
            onClick={() => nextPage()}
          >
            <MdNavigateNext className="text-active text-3xl cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
