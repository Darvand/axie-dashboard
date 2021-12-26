import React, { useMemo } from "react";
import { useTable } from "react-table";
import InsertRow from "./InsertRow";

type UpdateData = (rowIndex: number, columnId: string, value: any) => void;

declare module "react-table" {
  interface TableOptions<D extends object> {
    updateData?: UpdateData;
    skipPageReset?: boolean;
  }
}

interface Props {
  data: any[];
  columns: { Header: string; accessor: string }[];
  updateData?: UpdateData;
  skipPageReset?: boolean;
  onInsert?: (data: any) => void;
}

interface EditableCellProps {
  value: any;
  row: { index: number };
  column: { id: string };
  updateData: UpdateData;
}

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateData, // This is a custom function that we supplied to our table instance
}: EditableCellProps) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e: { target: { value: any } }) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateData(index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="bg-third text-center py-4 outline-none w-full"
    />
  );
};

const defaultColumn = {
  Cell: EditableCell,
};

const Table = ({
  data,
  columns,
  updateData,
  skipPageReset,
  onInsert,
}: Props) => {
  const memoData = useMemo(() => data, [data]);
  const memoColumns = useMemo(
    () =>
      onInsert
        ? [...columns, { Header: "Accion", accesor: "action" }]
        : columns,
    [columns, onInsert]
  );
  const tableOptions = updateData
    ? {
        columns: memoColumns,
        data: memoData,
        defaultColumn,
        updateData,
        skipPageReset,
      }
    : { columns: memoColumns, data: memoData };
  const tableInstance = useTable(tableOptions);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <div className="">
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className={`text-primary-text text-sm text-center uppercase font-bold rounded-t bg-active grid grid-cols-${headerGroup.headers.length} p-4`}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-primary-text text-base">
          {onInsert && (
            <tr>
              <InsertRow columns={columns} onSubmit={onInsert} />
            </tr>
          )}
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`bg-third text-center py-2 grid grid-cols-${row.cells.length}`}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
