import React, { ReactElement } from "react";

interface Props {
  title: string;
  children: ReactElement[];
}

const Card = ({ title, children }: Props) => {
  const [header, body] = children;
  return (
    <div className="w-72">
      <span className="text-primary-text text-base font-bold bg-active px-4 py-2 rounded-t">
        {title}
      </span>
      {header}
      {body}
    </div>
  );
};

export default Card;
