import { ReactElement } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PaymentIcon from "@mui/icons-material/Payment";

export interface page {
  text: string;
  icon: ReactElement<any, any>;
  href: string;
}

export const navigationList: page[] = [
  { text: "Home", icon: <HomeIcon />, href: "/news" },
  { text: "Payment", icon: <PaymentIcon />, href: "/payment" },
  // { text: "News", icon: <InfoIcon />, href: "/news" },
];
