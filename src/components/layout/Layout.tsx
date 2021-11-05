import React, { ReactChild } from "react";
import SideBar from "./SideBar";

interface Props {
  children: ReactChild[] | ReactChild;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-primary min-h-screen flex font-sans">
      <SideBar />
      <div className="w-content ml-52">{children}</div>
    </div>
  );
};

export default Layout;
