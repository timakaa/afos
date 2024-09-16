import { encrypt, SESSION_DURATION } from "@/lib/session";
import { validateTelegramWebAppData } from "@/lib/telegramAuth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { initData } = body;

  const validationResult = validateTelegramWebAppData(initData);

  if (validationResult.validatedData) {
    console.log("Validation result: ", validationResult);
    const user = {
      telegramId: validationResult.user.id,
      username: validationResult.user.username,
    };

    const expires = new Date(Date.now() + SESSION_DURATION);
    const session = await encrypt({ user, expires });

    cookies().set("session", session, { expires, httpOnly: true });

    return NextResponse.json({ message: "Authentication successfull" });
  } else {
    return NextResponse.json(
      { message: validationResult.message },
      { status: 401 },
    );
  }
}
