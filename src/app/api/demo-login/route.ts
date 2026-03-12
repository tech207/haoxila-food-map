import { NextResponse } from "next/server";
import { CUSTOMER_DEMO_COOKIE } from "@/lib/customer-session";

export function GET(request: Request) {
  const url = new URL(request.url);
  const next = url.searchParams.get("next");
  const redirectTo = next && next.startsWith("/") ? next : "/explore";
  const response = NextResponse.redirect(new URL(redirectTo, request.url));

  response.cookies.set(CUSTOMER_DEMO_COOKIE, "1", {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  return response;
}
