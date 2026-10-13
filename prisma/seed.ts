// One-off seed script: creates the single admin account if it doesn't exist.
// Run with: bun prisma/seed.ts
import bcrypt from "bcryptjs";
import { db } from "../src/lib/db";

const ADMIN_EMAIL = "admin@vocabquest.app";
const ADMIN_PASSWORD = "VocabAdmin@2025";
const ADMIN_NAME = "Site Admin";

async function main() {
  const existing = await db.user.findUnique({ where: { email: ADMIN_EMAIL } });
  if (existing) {
    // Ensure the seeded admin always has ADMIN role + enabled, in case of drift.
    if (existing.role !== "ADMIN" || existing.disabled) {
      await db.user.update({
        where: { id: existing.id },
        data: { role: "ADMIN", disabled: false },
      });
      console.log(`Admin account repaired: ${ADMIN_EMAIL}`);
    } else {
      console.log(`Admin account already exists: ${ADMIN_EMAIL}`);
    }
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await db.user.create({
    data: {
      email: ADMIN_EMAIL,
      name: ADMIN_NAME,
      passwordHash,
      role: "ADMIN",
      disabled: false,
    },
  });
  console.log(`Admin account created:`);
  console.log(`  Email:    ${ADMIN_EMAIL}`);
  console.log(`  Password: ${ADMIN_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
