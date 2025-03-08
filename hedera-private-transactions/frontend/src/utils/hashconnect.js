import { HashConnect } from "hashconnect";

const APP_METADATA = {
  name: "Hedera Private Transactions",
  description: "Privacy-focused transactions using HashConnect",
  icon: "https://your-app-icon-url.com/icon.png",
};

const hashconnect = new HashConnect();

export const initHashConnect = async () => {
  const initData = await hashconnect.init(APP_METADATA, "testnet", false);
  const pairingString = initData.pairingString;

  // Store pairing data
  let savedPairingData = null;
  hashconnect.pairingEvent.on((data) => {
    savedPairingData = data;
  });

  await pairWallet(pairingString);
  return { savedPairingData };
};

export const pairWallet = async (pairingString) => {
  const userApproval = window.confirm("Do you want to connect your HashPack wallet?");
  if (userApproval) {
    window.open(`https://app.hashpack.app/#/connect?pairing=${pairingString}`, "_blank");
  }
};
