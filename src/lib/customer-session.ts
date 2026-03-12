import { cookies } from "next/headers";

export const CUSTOMER_DEMO_COOKIE = "haoxila_customer_demo";

export function isDemoCustomerLoggedIn() {
  return cookies().get(CUSTOMER_DEMO_COOKIE)?.value === "1";
}
