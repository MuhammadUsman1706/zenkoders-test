export interface CheckoutSubscriptionBody {
  plan: string;
  planDescription: string;
  amount: number;
  interval: "month" | "year";
  customerId?: string;
  priceId: string;
}
