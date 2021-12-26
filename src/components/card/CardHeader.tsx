import React, { ReactElement } from "react";

interface Props {
  children: ReactElement | ReactElement[];
}

const CardHeader = ({ children }: Props) => {
  return (
    <div className=" py-4 px-8 flex justify-between bg-active text-primary-text rounded-tr">
      {children}
    </div>
  );
};

export default CardHeader;
