import React from "react";

interface Props {
  data: Record<string, string>[];
  headers: string[];
}

const Table = ({ data, headers }: Props) => {
  return (
    <section className="">
      <div
        className={`grid grid-cols-${headers.length} text-secondary-text text-sm border-b border-solid border-third text-center`}
      >
        {headers.map((header) => (
          <span>{header}</span>
        ))}
      </div>
      <div className={`text-primary-text text-base`}>
        {data.map((row) => {
          const keys = Object.keys(row);
          return (
            <div
              className={`border-b border-solid border-third grid grid-cols-${headers.length} text-center py-4`}
            >
              {keys.map((key) => (
                <span>{row[key]}</span>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Table;
