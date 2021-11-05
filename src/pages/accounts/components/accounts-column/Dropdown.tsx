import React, { useState } from "react";

import { RiArrowDownSFill } from "react-icons/ri";

interface Props {
  options: string[];
  selected: string[];
  onClick: (option: string) => void;
  onRemove: (option: string) => void;
}

const Dropdown = ({ options, selected, onClick, onRemove }: Props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="relative">
      <div className="group w-full p-4 flex gap-1 justify-between items-center bg-primary cursor-pointer">
        <div className="flex flex-col gap-1">
          {selected.map((option) => (
            <span
              className="border border-active border-solid rounded-md text-primary-text px-2 py-1 hover:bg-active"
              onClick={() => onRemove(option)}
            >
              {option}
            </span>
          ))}
          <span
            className="text-secondary-text"
            onClick={() => setExpanded(!expanded)}
          >
            Buscar por grupo
          </span>
        </div>
        <i
          className="text-primary-text text-lg  group-hover:text-active"
          onClick={() => setExpanded(!expanded)}
        >
          <RiArrowDownSFill />
        </i>
      </div>
      <div
        className={`absolute border-2 border-solid border-active shadow
         my-2 py-2 bg-primary w-full ${expanded ? "block" : "hidden"}`}
      >
        {options.map((option) => {
          return (
            <div
              key={option}
              className="w-full px-4 py-1 hover:bg-active text-primary-text cursor-pointer"
              onClick={() => onClick(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Dropdown;
