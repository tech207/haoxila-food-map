import { NextResponse } from "next/server";
import { getMerchantTickets } from "@/lib/merchant-data";

export function GET() {
  return NextResponse.json(getMerchantTickets());
}

export async function POST() {
  return NextResponse.json(
    { message: "Coupon creation scaffolded. Persist to Prisma in the next step." },
    { status: 501 },
  );
}
