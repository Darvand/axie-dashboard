import React from "react";

interface Props {}

const NavBar = (props: Props) => {
  return (
    <div className="h-20 flex items-center gap-2 border-solid border-secondary">
      <img
        src="https://cdn.axieinfinity.com/landing-page/_next/static/images/axie-b619af9f55752f686b0d8f152c979adf@1x.webp"
        alt="AXS Icon"
        width="120px"
        className="ml-8"
      />
    </div>
  );
};

export default NavBar;
