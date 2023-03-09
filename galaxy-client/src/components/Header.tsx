import { useWallets } from "@/core/useWallets";
import { chainStateAtom } from "@/state/atom";
import { shortenAddress } from "@/util/utils";

import Image from "next/image";
import React from "react";
import { useRecoilValue } from "recoil";
import { DisconnectIcon } from "./common/Icon";

const Header = () => {
  const { connected, address } = useWallets();
  const chain = useRecoilValue(chainStateAtom);

  const handleConnectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="overflow-hidden">
      <div
        className={`flex items-center justify-between px-8 py-4 ${
          chain === "ETH"
            ? "bg-blue-1000"
            : chain === "SOL"
            ? "bg-purple-1000"
            : chain === "APTOS"
            ? "bg-gray-900"
            : "bg-blue-1000"
        }`}
      >
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <Image
              width={60}
              height={60}
              src="/galaxyLogo.png"
              alt="galaxyLogo"
              className="rounded-full shadow-md mr-3"
            />
            <div className="w-auto mr-14 flex">
              <h1 className="font-semibold text-3xl leading-tight text-white">
                Galaxy
                <p className="text-base text-gray-500 font-medium">
                  : The Multi-chain NFT Marketplace
                </p>
              </h1>
            </div>
          </div>
        </div>
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            {connected ? (
              <div className="flex w-auto py-3 px-6 bg-indigo-600 hover:bg-indigo-600 rounded shadow">
                <p className="m-auto font-heading text-white leading-none text-lg">
                  Address: {shortenAddress(address)}
                </p>
                <DisconnectIcon />
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="flex w-auto py-3 px-6 bg-indigo-600 hover:bg-indigo-600 rounded shadow"
              >
                <Image
                  width={35}
                  height={35}
                  src="/logo/metamask.png"
                  alt="metamask"
                  className="rounded-full shadow-md mr-4"
                />
                <p className="m-auto font-heading text-white leading-none text-lg">
                  Connect Wallet
                </p>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
