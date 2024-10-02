import React, { useState, useEffect } from "react";
import { useWallet, useTransfer, useConnect } from "@connect2ic/react";

const Transfer = () => {
  const [wallet] = useWallet();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [transfer] = useTransfer({
    to: "z475q-x2ruu-zzb75-k54s6-l4ccl-7n2nr-kj4aa-vtxin-col4e-xevj4-5ae",
    amount: Number(0.0001),
  });
  const { isConnected, principal, activeProvider, connect } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    },
  });

  // Effect to monitor wallet connection status
  useEffect(() => {
    if (wallet) {
      setIsWalletConnected(true);
      console.log("Wallet is connected.");
    } else {
      setIsWalletConnected(false);
      console.log("Wallet is not connected.");
    }
  }, [wallet, isConnected, principal]); // Dependency array includes wallet to re-run the effect when wallet changes

  const onPurchase = async () => {
    try {
      const result = await transfer();
      if (
        result &&
        result.value &&
        result.value.height &&
        result.value.height.height
      ) {
        console.log("myHeight=>", result.value.height.height);
        if (result.value.height.height >= 12480311) {
          console.log("Transaction successful");
        } else {
          console.log("Transaction failed");
        }
      } else {
        console.log("Transaction failed - no height information available");
      }
    } catch (error) {
      console.error("Transaction failed - error during transaction", error);
    }
  };

  return (
    <div className="example">
      {isWalletConnected ? (
        <>
          <p>Buy me beer</p>
          <button className="connect-button" onClick={onPurchase}>
            Purchase
          </button>
        </>
      ) : (
        <p className="example-disabled">
          Connect with a wallet to access this example
        </p>
      )}
    </div>
  );
};

export { Transfer };
