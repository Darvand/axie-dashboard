import React, { ReactElement, ReactNode } from "react";
import { RowItemProps } from "./RowItem";

interface Props {
  Icon: ReactNode;
  title: string;
  titleValue: string;
  rows: ReactElement<RowItemProps>[];
}

const CardContainer = ({ Icon, title, titleValue, rows }: Props) => {
  return (
    <div className="w-60 border border-solid border-third ">
      <div className="flex items-center border-b border-solid border-third">
        <div className="bg-secondary w-20 h-20 flex items-center justify-center">
          {Icon}
        </div>
        <div className="flex flex-col px-4">
          <h2 className="text-secondary-text font-bold text-base">{title}</h2>
          <h1 className="text-lg text-primary-text font-bold">{titleValue}</h1>
        </div>
      </div>
      <ul className="p-4 flex flex-col gap-2 ">{rows}</ul>
    </div>
  );
};

export default CardContainer;
