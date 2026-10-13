import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      disabled: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({
    users,
    total: users.length,
    admins: users.filter((u) => u.role === "ADMIN").length,
    active: users.filter((u) => !u.disabled).length,
    disabled: users.filter((u) => u.disabled).length,
  });
}

export async function PATCH(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { id?: string; action?: "disable" | "enable" | "promote" | "demote" };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { id, action } = body;
  if (!id || !action) {
    return NextResponse.json({ error: "id and action are required." }, { status: 422 });
  }

  // Guardrail: never let the admin disable/demote themselves.
  if (id === session.user.id) {
    return NextResponse.json(
      { error: "You cannot modify your own account." },
      { status: 409 }
    );
  }

  const target = await db.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  switch (action) {
    case "disable":
      await db.user.update({ where: { id }, data: { disabled: true } });
      break;
    case "enable":
      await db.user.update({ where: { id }, data: { disabled: false } });
      break;
    case "promote":
      await db.user.update({ where: { id }, data: { role: "ADMIN" } });
      break;
    case "demote":
      if (target.role !== "ADMIN") break;
      await db.user.update({ where: { id }, data: { role: "USER" } });
      break;
    default:
      return NextResponse.json({ error: "Unknown action." }, { status: 422 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required." }, { status: 422 });
  }
  if (id === session.user.id) {
    return NextResponse.json(
      { error: "You cannot delete your own account." },
      { status: 409 }
    );
  }

  const target = await db.user.findUnique({ where: { id } });
  if (!target) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
  if (target.role === "ADMIN") {
    return NextResponse.json(
      { error: "Refusing to delete an admin account." },
      { status: 409 }
    );
  }

  await db.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
