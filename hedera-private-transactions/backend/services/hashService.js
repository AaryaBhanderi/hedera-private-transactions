import crypto from "crypto";

// Hash an account ID
export function hashAccountId(accountId) {
  return crypto.createHash("sha256").update(accountId).digest("hex");
}
