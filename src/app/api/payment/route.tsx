import { CheckoutSubscriptionBody } from "@/app/models/paymentModel";
import { stripe } from "@/lib/stripe";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const { priceId } = (await req.json()) as CheckoutSubscriptionBody;
  const origin = req.headers.get("origin") || "http://localhost:3000";

  // if user is logged in, redirect to news page, otherwise stay at payment page.
  const success_url = `${origin}/news?session_id={CHECKOUT_SESSION_ID}`;

  try {
    const customerId = cookies().get("stripe")?.value as string;
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription", // mode should be subscription
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: success_url,
      cancel_url: `${origin}/payment?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return NextResponse.json({ message }, { status: error.statusCode });
    }
  }
}
