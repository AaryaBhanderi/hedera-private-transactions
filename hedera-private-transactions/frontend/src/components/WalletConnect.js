import React, { useState } from "react";
import { initHashConnect, pairWallet } from "../utils/hashconnect";

function WalletConnect() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [accountId, setAccountId] = useState("");

  const connectWallet = async () => {
    const { savedPairingData } = await initHashConnect();
    if (savedPairingData) {
      setWalletConnected(true);
      setAccountId(savedPairingData.accountIds[0]);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {walletConnected && <p>Connected to: {accountId}</p>}
    </div>
  );
}

export default WalletConnect;
