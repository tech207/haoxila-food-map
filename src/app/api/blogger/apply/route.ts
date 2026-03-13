import { NextResponse } from "next/server";
import { bloggerApplications, bloggerApplySchema } from "@/lib/site-forms";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bloggerApplySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: parsed.error.issues[0]?.message ?? "資料格式錯誤" },
      { status: 400 },
    );
  }

  bloggerApplications.unshift({
    ...parsed.data,
    id: `blogger-${crypto.randomUUID()}`,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    message: "我們會在 3 個工作天內回覆",
  });
}
