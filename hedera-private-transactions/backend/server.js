import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import walletRoutes from "./routes/walletRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import { connectWallet, getAccountId } from './services/walletService.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/wallet", walletRoutes);
app.use("/api/transaction", transactionRoutes);

app.get('/connect', async (req, res) => {
  try {
    const appMetadata = {
      name: "Hedera Private Transactions",
      description: "A project to handle private transactions on Hedera",
      icon: "https://example.com/icon.png"
    };
    console.log("Received request to connect wallet with metadata:", appMetadata);
    const pairingString = await connectWallet(appMetadata);
    console.log("Pairing string received:", pairingString);
    res.send({ pairingString });
  } catch (error) {
    console.error("Error in /connect endpoint:", error);
    res.status(500).send({ error: error.message });
  }
});

app.get('/account', async (req, res) => {
  try {
    const accountId = await getAccountId();
    res.send({ accountId });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
