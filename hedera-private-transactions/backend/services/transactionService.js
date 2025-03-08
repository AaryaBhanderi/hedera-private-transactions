import { hashAccountId } from "./hashService.js";
import { encryptAmount } from "./encryptionService.js";
import { storeOnHedera } from "./hederaService.js";
import { generateZKP } from "./zkpService.js";

export async function executePrivateTransaction(senderId, receiverId, amount) {
  const hashedSender = hashAccountId(senderId);
  const hashedReceiver = hashAccountId(receiverId);
  const encryptedAmount = encryptAmount(amount);

  const transactionData = JSON.stringify({
    sender: hashedSender,
    receiver: hashedReceiver,
    amount: encryptedAmount,
  });

  const fileId = await storeOnHedera(transactionData);
  const { proof } = await generateZKP(fileId);

  return { fileId, proof };
}
