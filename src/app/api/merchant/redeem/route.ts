import { NextResponse } from "next/server";
import { redeemMerchantOrder } from "@/lib/merchant-data";

export async function POST(request: Request) {
  const body = (await request.json()) as { orderId?: string; otpCode?: string };
  const result = redeemMerchantOrder(body.orderId ?? "", body.otpCode ?? "");

  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result);
}
