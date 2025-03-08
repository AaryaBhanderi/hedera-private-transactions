import { FileCreateTransaction, Client } from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

const client = Client.forTestnet().setOperator(process.env.OPERATOR_ID, process.env.OPERATOR_KEY);

export async function storeOnHedera(encryptedData) {
  const fileTransaction = await new FileCreateTransaction()
    .setContents(encryptedData)
    .execute(client);

  const receipt = await fileTransaction.getReceipt(client);
  return receipt.fileId.toString();
}
