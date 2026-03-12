import { NextResponse } from "next/server";
import { stores } from "@/lib/customer-data";

export function GET() {
  return NextResponse.json(stores);
}
