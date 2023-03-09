import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const useWallets = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Please install MetaMask!");
      }

      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setConnected(true);
        } else {
          setAddress("");
          setConnected(false);
        }
      });

      window.ethereum.on("chainChanged", (chainId: string) => {
        console.log("chainChanged", chainId);
      });

      const provider = new ethers.BrowserProvider(ethereum);

      (async () => {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAddress(accounts[0].address);
          setConnected(true);
        }
      })();

      return () => {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      };
    };

    connectWallet();
  }, []);

  return {
    connected,
    address,
  };
};
