import { NextResponse } from "next/server";
import { CUSTOMER_DEMO_COOKIE } from "@/lib/customer-session";

export function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/explore", request.url));

  response.cookies.set(CUSTOMER_DEMO_COOKIE, "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
}
