import prisma from "@/prisma/client";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { getScriptSchema, scriptSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("audio") as File;
  const original_caption = formData.get("original_caption") as string;
  const validation = scriptSchema.safeParse({ original_caption });

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(" ", "_");

    try {
      await writeFile(
        path.join(process.cwd(), "public/audios/", filename),
        buffer
      );

      console.log("3");

      // Retrieve the host from the request
      const host = request.headers.get("host");
      // Determine the protocol
      const protocol = request.headers.get("x-forwarded-proto") || "http";
      // Construct the audio URL dynamically
      const audioUrl = `${protocol}://${host}/audios/${filename}`;

      const newScript = await prisma.script.create({
        data: {
          original_caption: original_caption.toString(),
          edited_caption: original_caption.toString(),
          audioUrl: audioUrl,
        },
      });

      return NextResponse.json(newScript, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: "File upload failed", status: 500 });
    }
  } else {
    return NextResponse.json({ message: "No file uploaded", status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(
    request.nextUrl.searchParams.get("pageSize") || "10",
    10
  );

  const validation = getScriptSchema.safeParse({ page, pageSize });

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const scripts = await prisma.script.findMany({
    // where: { status: "CHECKING" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  // const scripts = await prisma.script.findMany({});

  return NextResponse.json(scripts, { status: 200 });
}
