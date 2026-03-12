import { NextResponse } from "next/server";
import { orders } from "@/lib/customer-data";

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST() {
  return NextResponse.json(
    { message: "Order creation scaffolded. Connect payment flow and Prisma persistence next." },
    { status: 501 },
  );
}
