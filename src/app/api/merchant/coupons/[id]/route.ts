import { NextResponse } from "next/server";
import { getMerchantTickets } from "@/lib/merchant-data";

export function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const ticket = getMerchantTickets().find((item) => item.id === params.id);

  if (!ticket) {
    return NextResponse.json({ message: "Coupon not found" }, { status: 404 });
  }

  return NextResponse.json(ticket);
}

export async function PATCH() {
  return NextResponse.json(
    { message: "Coupon update scaffolded. Persist to Prisma in the next step." },
    { status: 501 },
  );
}
