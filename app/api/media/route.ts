import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (!session) return NextResponse.json({ success: false }, { status: 401 });

  // const user = await decrypt(session);

  const imagePath = path.join(
    process.cwd(),
    "private",
    "uploads",
    "test_pack.jpg",
  );

  if (!fs.existsSync(imagePath)) {
    return NextResponse.json({ message: "Image not found" }, { status: 404 });
  }
  const imageBuffer = fs.readFileSync(imagePath);
  const fileExtension = path.extname(imagePath).toLowerCase();

  console.log(fileExtension);

  let contentType;
  switch (fileExtension) {
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".webp":
      contentType = "image/webp";
      break;
    default:
      contentType = "image/jpeg";
  }

  const response = new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": contentType,
    },
  });

  return response;
}
