import { NextResponse } from "next/server";
import { buildOtpCode, getOrderById } from "@/lib/customer-data";

export function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const order = getOrderById(params.id);

  if (!order) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  const expiresIn = 30 - Math.floor((Date.now() % 30000) / 1000);

  return NextResponse.json({
    orderId: order.id,
    status: order.status,
    otpCode: order.status === "PAID" ? buildOtpCode(order.id) : "------",
    expiresIn,
    storeName: order.storeName,
    ticketTitle: order.ticketTitle,
  });
}
