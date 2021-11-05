import React from "react";
import { RouteType } from "../constants/routes";

interface Props extends RouteType {
  isActive: boolean;
  onClick: (path: string) => void;
}

const SideBarButton = ({ isActive, icon, path, label, onClick }: Props) => {
  return (
    <button
      className={`button border-active border-solid font-semibold ${
        isActive ? "border-l-4" : "border-l-0"
      }`}
      onClick={() => onClick(path)}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default SideBarButton;
