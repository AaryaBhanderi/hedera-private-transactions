import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export function encryptAmount(amount) {
  const cipher = crypto.createCipher("aes-256-cbc", SECRET_KEY);
  let encrypted = cipher.update(amount.toString(), "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}
