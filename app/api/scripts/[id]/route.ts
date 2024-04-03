import { patchScriptSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = patchScriptSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { edited_caption } = body;

  const script = await prisma.script.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!script) {
    return NextResponse.json({ error: "Invalid script" }, { status: 404 });
  }

  const updatedScript = await prisma.script.update({
    where: { id: script.id },
    data: {
      status:
        script?.original_caption === edited_caption
          ? "CHECKED_OK"
          : "CHECKED_EDITED",
      original_caption: script?.original_caption,
      edited_caption,
    },
  });

  return NextResponse.json(updatedScript);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const script = await prisma.script.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!script) {
    return NextResponse.json({ error: "Invalid script" }, { status: 404 });
  }

  await prisma.script.delete({ where: { id: script.id } });

  return NextResponse.json({});
}
