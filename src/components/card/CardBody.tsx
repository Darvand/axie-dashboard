import React, { ReactElement } from "react";

interface Props {
  children: ReactElement;
}

const CardBody = ({ children }: Props) => {
  return (
    <div className="text-primary-text p-4 rounded-b border-2 border-t-0 border-third border-solid">
      {children}
    </div>
  );
};

export default CardBody;
