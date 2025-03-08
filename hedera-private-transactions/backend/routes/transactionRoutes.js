import express from "express";
import { executePrivateTransaction } from "../services/transactionService.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  const { senderId, receiverId, amount } = req.body;
  try {
    const result = await executePrivateTransaction(senderId, receiverId, amount);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
