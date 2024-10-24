import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!session.user.telegramId)
    return NextResponse.json(
      { error: "User not found", isMember: false },
      { status: 404 },
    );
}
