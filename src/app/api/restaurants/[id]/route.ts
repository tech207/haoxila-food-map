import { NextResponse } from "next/server";
import { getStoreById } from "@/lib/customer-data";

export function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const store = getStoreById(params.id);

  if (!store) {
    return NextResponse.json({ message: "Restaurant not found" }, { status: 404 });
  }

  return NextResponse.json(store);
}
