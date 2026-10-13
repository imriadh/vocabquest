// Server-side encryption for user-provided API keys (AGENT.md §9.4).
// AES-256-GCM authenticated encryption. The master key is ENCRYPTION_KEY
// (64 hex chars = 32 bytes) and must NEVER be exposed to the client.
//
// Storage format: "iv:authTag:ciphertext" all base64. Deterministic-ish IV is
// NOT used — a fresh random IV per encryption (GCM requirement).

import { randomBytes, createCipheriv, createDecipheriv } from "crypto";

const ALGO = "aes-256-gcm";
const IV_LEN = 12; // GCM standard IV length

function getKey(): Buffer {
  const raw = process.env.ENCRYPTION_KEY;
  if (!raw || raw.length !== 64) {
    throw new Error(
      "ENCRYPTION_KEY must be set to a 64-char hex string (32 bytes) for API key encryption."
    );
  }
  return Buffer.from(raw, "hex");
}

export function encrypt(plaintext: string): string {
  const iv = randomBytes(IV_LEN);
  const cipher = createCipheriv(ALGO, getKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [iv.toString("base64"), authTag.toString("base64"), ciphertext.toString("base64")].join(":");
}

export function decrypt(payload: string): string {
  const parts = payload.split(":");
  if (parts.length !== 3) throw new Error("Malformed ciphertext payload.");
  const [ivB64, authTagB64, ciphertextB64] = parts;
  const iv = Buffer.from(ivB64, "base64");
  const authTag = Buffer.from(authTagB64, "base64");
  const ciphertext = Buffer.from(ciphertextB64, "base64");
  const decipher = createDecipheriv(ALGO, getKey(), iv);
  decipher.setAuthTag(authTag);
  const plaintext = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return plaintext.toString("utf8");
}

/** Last 4 chars of the plaintext key — safe to display to the user. */
export function keyHint(plaintext: string): string {
  return plaintext.length >= 4 ? plaintext.slice(-4) : plaintext;
}
