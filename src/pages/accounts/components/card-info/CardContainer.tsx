import React, { ReactElement, ReactNode } from "react";
import { RowItemProps } from "./RowItem";

interface Props {
  title: string;
  value: string | number;
  unit: string;
  special?: boolean;
}

const CardContainer = ({ title, value, unit, special = false }: Props) => {
  console.log(title, special);
  return (
    <section className="flex items-center font-montserrat">
      <span className="bg-active w-1 h-28 rounded"></span>
      <div
        className={`bg-secondary w-52 h-24 flex-col px-5 py-4 rounded-r gap-3 ${
          special ? "text-primary" : "text-white"
        }`}
        style={
          special
            ? {
                background: "linear-gradient(90deg, #9BF2EA 0%, #B8C6D9 12%)",
              }
            : {}
        }
      >
        <h3 className="text-base">{title}</h3>
        <div className="flex justify-end items-end gap-1">
          <p className="font-bold text-3xl">{value}</p>
          <span className="text-lg font-bold">{unit}</span>
        </div>
      </div>
    </section>
  );
};
export default CardContainer;
