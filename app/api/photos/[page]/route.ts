import { getPhotos } from "@/app/actions/photos";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 30;

export async function GET(
  request: Request,
  { params }: { params: { page: string } },
) {
  const page = parseInt(params.page);
  if (isNaN(page) || page < 1) {
    return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
  }

  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { telegramId: session.user.telegramId },
    include: { boughtPhotos: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const data = await getPhotos(page);
  return NextResponse.json(data);
}
