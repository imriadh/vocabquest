import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Shape of the persisted progress blob.
interface ProgressBlob {
  customWords?: unknown[];
  srs?: Record<string, unknown>;
  manualMark?: Record<string, unknown>;
  difficult?: Record<string, unknown>;
  quizHistory?: unknown[];
  reviewLog?: unknown[];
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { progress: true },
  });
  let progress: ProgressBlob = {};
  if (user?.progress) {
    try {
      progress = JSON.parse(user.progress) as ProgressBlob;
    } catch {
      progress = {};
    }
  }
  return NextResponse.json({ progress });
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: ProgressBlob;
  try {
    body = (await request.json()) as ProgressBlob;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Sanity-cap the blob size to avoid unbounded storage (~1.5MB).
  const serialized = JSON.stringify(body);
  if (serialized.length > 1_500_000) {
    return NextResponse.json({ error: "Progress payload too large." }, { status: 413 });
  }

  await db.user.update({
    where: { id: session.user.id },
    data: { progress: serialized },
  });
  return NextResponse.json({ ok: true });
}
