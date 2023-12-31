import { FC } from "react";
import PaymentCards from "../components/Payment/Payment";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PaymentPage: FC = () => {
  const uid = cookies().get("session")?.value;
  if (!uid) redirect("/");

  return <PaymentCards uid={uid as string} />;
};

export default PaymentPage;
