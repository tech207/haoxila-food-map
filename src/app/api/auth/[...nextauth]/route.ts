import { NextResponse } from "next/server";

function notImplemented() {
  return NextResponse.json(
    { message: "NextAuth route scaffolded but not configured yet." },
    { status: 501 },
  );
}

export const GET = notImplemented;
export const POST = notImplemented;
