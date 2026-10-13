import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { encrypt, keyHint } from "@/lib/crypto";

export const dynamic = "force-dynamic";

// Supported BYOK providers (AGENT.md §9.4).
const SUPPORTED_PROVIDERS = ["openai", "gemini", "grok", "openai-compatible"] as const;
type Provider = (typeof SUPPORTED_PROVIDERS)[number];

function isProvider(p: string): p is Provider {
  return (SUPPORTED_PROVIDERS as readonly string[]).includes(p);
}

// GET — list the user's stored keys (NEVER returns the plaintext key, only the hint).
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const keys = await db.apiKey.findMany({
    where: { userId: session.user.id },
    select: { id: true, provider: true, label: true, keyHint: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ keys });
}

// POST — create or replace a key for a provider (upsert by [userId, provider]).
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: { provider?: string; key?: string; label?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  const provider = body.provider?.trim().toLowerCase();
  const key = body.key?.trim();
  const label = body.label?.trim() || null;

  if (!provider || !isProvider(provider)) {
    return NextResponse.json(
      { error: `Provider must be one of: ${SUPPORTED_PROVIDERS.join(", ")}.` },
      { status: 422 }
    );
  }
  if (!key || key.length < 10) {
    return NextResponse.json({ error: "A valid API key (≥10 chars) is required." }, { status: 422 });
  }

  const encryptedKey = encrypt(key);
  const hint = keyHint(key);

  const record = await db.apiKey.upsert({
    where: { userId_provider: { userId: session.user.id, provider } },
    create: { userId: session.user.id, provider, label, encryptedKey, keyHint: hint },
    update: { label, encryptedKey, keyHint: hint },
    select: { id: true, provider: true, label: true, keyHint: true, updatedAt: true },
  });

  return NextResponse.json({ ok: true, key: record });
}

// DELETE — remove a key by provider (?provider=) or id (?id=).
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider");
  const id = searchParams.get("id");

  if (!provider && !id) {
    return NextResponse.json({ error: "Provide ?provider= or ?id=." }, { status: 422 });
  }

  await db.apiKey.deleteMany({
    where: {
      userId: session.user.id,
      ...(provider ? { provider } : { id: id ?? undefined }),
    },
  });
  return NextResponse.json({ ok: true });
}
