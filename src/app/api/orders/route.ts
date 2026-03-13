import { NextResponse } from "next/server";
import { getTicketById, orders } from "@/lib/customer-data";

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const ticketId = typeof body?.ticketId === "string" ? body.ticketId : null;

  if (!ticketId) {
    return NextResponse.json({ message: "ticketId is required." }, { status: 400 });
  }

  const ticket = getTicketById(ticketId);

  if (!ticket) {
    return NextResponse.json({ message: "Ticket not found." }, { status: 404 });
  }

  const nextNumericId = orders.reduce((max, order) => {
    const parsed = Number(order.id.replace("order-", ""));
    return Number.isFinite(parsed) ? Math.max(max, parsed) : max;
  }, 10000) + 1;

  const order = {
    id: `order-${nextNumericId}`,
    status: "PAID" as const,
    customerName: "王小美",
    purchasedAt: new Date().toISOString(),
    totalAmount: ticket.price,
    storeId: ticket.storeId,
    storeName: ticket.storeName,
    district: ticket.district,
    ticketId: ticket.id,
    ticketTitle: ticket.title,
    validUntil: ticket.validUntil,
  };

  orders.unshift(order);

  return NextResponse.json(order, { status: 201 });
}
