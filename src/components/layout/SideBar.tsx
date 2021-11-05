import React, { useState } from "react";
import { RiLogoutCircleFill } from "react-icons/ri";
import { useHistory } from "react-router";
import { routes } from "./constants/routes";
import SideBarButton from "./components/SideBarButton";

interface Props {}

const INDEX_PATH = routes[0].path;

const SideBar = (props: Props) => {
  const history = useHistory();
  const selected = routes
    .map((route) => route.path)
    .find((route) => route === history.location.pathname);
  const [selectedTab, setSelectedTab] = useState(selected || INDEX_PATH);
  const pushButton = (location: string) => {
    history.push(location);
    setSelectedTab(
      routes.find((route) => route.path === location)?.path || INDEX_PATH
    );
  };
  return (
    <div className=" text-primary-text text-lg flex flex-col w-52 fixed h-full justify-between">
      <section>
        <div className="h-20 flex items-center gap-2 border-solid border-secondary my-4 justify-center">
          <img
            src="https://cdn.axieinfinity.com/landing-page/_next/static/images/axie-b619af9f55752f686b0d8f152c979adf@1x.webp"
            alt="AXS Icon"
            width="120px"
          />
        </div>
        <section>
          {routes.map((route) => (
            <SideBarButton
              onClick={pushButton}
              isActive={route.path === selectedTab}
              {...route}
            />
          ))}
        </section>
      </section>
      <button className={`button border-active border-solid`}>
        <RiLogoutCircleFill />
        <span>Salir</span>
      </button>
    </div>
  );
};

export default SideBar;
