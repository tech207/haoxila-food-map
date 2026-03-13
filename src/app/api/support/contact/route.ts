import { NextResponse } from "next/server";
import { supportContactSchema, supportTickets } from "@/lib/site-forms";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = supportContactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.issues[0]?.message ?? "資料格式錯誤" },
      { status: 400 },
    );
  }

  const ticketId = `TICKET-${Math.random().toString().slice(2, 8)}`;

  supportTickets.unshift({
    ...parsed.data,
    id: ticketId,
    status: "OPEN",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    ticketId,
  });
}
