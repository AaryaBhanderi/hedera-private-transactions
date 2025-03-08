import express from "express";
import { connectWallet, getAccountId } from "../services/walletService.js";

const router = express.Router();

router.get("/connect", async (req, res) => {
  try {
    const appMetadata = {
      name: "Private Transactions",
      description: "Privacy-focused transactions on Hedera",
    };
    const pairingString = await connectWallet(appMetadata);
    res.status(200).json({ success: true, pairingString });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/account", async (req, res) => {
  try {
    const accountId = await getAccountId();
    if (accountId) {
      res.status(200).json({ success: true, accountId });
    } else {
      res.status(400).json({ success: false, message: "No wallet connected." });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
