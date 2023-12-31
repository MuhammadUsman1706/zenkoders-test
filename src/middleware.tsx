import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";

export async function middleware(request: NextRequest, response: NextResponse) {
  try {
    const session = request.cookies.get("session");

    // Return to /login if don't have a session
    if (!session) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const stripeCustomer = request.cookies.get("stripe");
    const subscriptions = await stripe?.subscriptions.list({
      customer: stripeCustomer?.value,
      limit: 3,
    });

    if (subscriptions?.data?.length > 0) return NextResponse.next();

    return NextResponse.redirect(new URL("/payment", request.url));
  } catch (err) {
    return NextResponse.redirect(new URL("/payment", request.url));
  }
}

// Add your protected routes
export const config = {
  matcher: ["/news"],
};
