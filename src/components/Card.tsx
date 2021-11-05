import React, { ReactChild } from "react";

interface Props {
  children: ReactChild;
}

const Card = ({ children }: Props) => {
  return (
    <div
      className="bg-secondary px-6 py-6 rounded-lg shadow-md"
      style={{ width: "fit-content" }}
    >
      {children}
    </div>
  );
};

export default Card;
