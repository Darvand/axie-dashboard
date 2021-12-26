import { BsFillPersonBadgeFill } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { MdOutlineAccountTree } from "react-icons/md";

export interface RouteType {
  path: string;
  icon: IconType;
  label: string;
}

export const routes: RouteType[] = [
  {
    path: "/home",
    icon: MdOutlineAccountTree,
    label: "Home",
  },
  {
    path: "/accounts",
    icon: MdOutlineAccountTree,
    label: "Cuentas",
  },
  {
    path: "/payments",
    icon: FaWallet,
    label: "Pagos",
  },
  {
    path: "/scholars",
    icon: BsFillPersonBadgeFill,
    label: "Becados",
  },
];
