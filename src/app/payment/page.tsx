// "use client";
// import React, { FormEvent, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
// );

// export default function PreviewPage() {
//   useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     if (query.get("success")) {
//       console.log("Order placed! You will receive an email confirmation.");
//     }

//     if (query.get("canceled")) {
//       console.log(
//         "Order canceled -- continue to shop around and checkout when youre ready."
//       );
//     }
//   }, []);

//   const stripePaymentInitiateHandler = async (
//     event: FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();
//     if (!stripePromise) return;
//     await axios.post("/api/payment", {
//       priceId: "price_1Nzk1dBRqMpZdbFQHedheVec",
//     });
//   };

//   return (
//     <form action="/api/payment" method="POST">
//       <section>
//         <button type="submit" role="link">
//           Checkout
//         </button>
//       </section>
//     </form>
//   );
// }

// components/MonthlySubscriptionCard.tsx
"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CheckoutSubscriptionBody } from "../models/paymentModel";
import Stripe from "stripe";
import axios from "axios";

const PaymentPage = () => {
  const handleClick = async () => {
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    const stripe = await loadStripe(STRIPE_PK);

    const body: CheckoutSubscriptionBody = {
      interval: "month",
      amount: 2000,
      plan: "Monthly",
      planDescription: "Subscribe for $20 per month",
      priceId: "price_1NzlRtBRqMpZdbFQRagO5buG",
    };

    const result = await axios.post("/api/payment", body);

    const sessionId = result.data.id;
    console.log(sessionId, result);
    stripe?.redirectToCheckout({ sessionId });
  };

  // render simple cards

  return (
    <div className="border border-gray-100 rounded-md p-8 flex flex-col gap-2 items-start">
      <h2 className="text-xl font-bold text-gray-700">Monthly Subscription</h2>
      <p className="text-gray-400">$20 per month</p>
      <button
        onClick={() => handleClick()}
        className="border border-violet-200 text-violet-500 rounded-md px-4 py-2 w-full hover:bg-violet-500 hover:text-violet-200 transition-colors"
      >
        Subscribe
      </button>
    </div>
  );
};

export default PaymentPage;
