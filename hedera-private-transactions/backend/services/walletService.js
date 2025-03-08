import { HashConnect } from "hashconnect";

const hashconnect = new HashConnect();

export async function connectWallet(appMetadata) {
  const initData = await hashconnect.init(appMetadata, "testnet", false);
  return initData.pairingString;
}

export async function getAccountId() {
  if (hashconnect.pairingData.length > 0) {
    return hashconnect.pairingData[0].accountIds[0];
  } else {
    console.log("No wallet detected. Ensure HashPack is open.");
    return null;
  }
}
