import { NextResponse } from "next/server";
import { getMerchantDashboardData } from "@/lib/merchant-data";

export function GET() {
  return NextResponse.json(getMerchantDashboardData());
}
