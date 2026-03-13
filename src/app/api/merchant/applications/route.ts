import { NextResponse } from "next/server";
import { merchantApplications, merchantApplySchema } from "@/lib/site-forms";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = merchantApplySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.issues[0]?.message ?? "資料格式錯誤" },
      { status: 400 },
    );
  }

  const applicationId = `merchant-${crypto.randomUUID()}`;

  merchantApplications.unshift({
    ...parsed.data,
    id: applicationId,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    applicationId,
  });
}
