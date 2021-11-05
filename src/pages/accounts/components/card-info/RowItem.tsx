import React from "react";

export interface RowItemProps {
  title: string;
  value: string;
  isStatus?: boolean;
}

const RowItem = ({ title, value, isStatus = false }: RowItemProps) => {
  return (
    <li className="flex justify-between w-full">
      <h2 className="text-secondary-text text-base">{title}</h2>
      <h1 className="text-base text-primary-text">
        {isStatus ? (
          <span className="bg-active py-1 px-2 rounded-md font-bold">
            {value}
          </span>
        ) : (
          <span>{value}</span>
        )}
      </h1>
    </li>
  );
};

export default RowItem;
