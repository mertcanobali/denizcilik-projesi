import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: "1", name: "Ever Given", type: "Container Ship", status: "active" },
    { id: "2", name: "Sea Seeker", type: "Bulk Carrier", status: "maintenance" },
  ]);
}
