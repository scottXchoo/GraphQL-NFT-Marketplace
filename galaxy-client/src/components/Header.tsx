import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <section className="overflow-hidden">
      <div className="flex items-center justify-between px-8 py-4 bg-gray-900">
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <Image
              width={60}
              height={60}
              src="/galaxyLogo.png"
              alt=""
              className="rounded-full shadow-md mr-3"
            />
            <div className="w-auto mr-14 flex">
              <h1 className="font-semibold text-3xl leading-tight text-white">
                Galaxy
                <p className="text-base text-gray-500">
                  : The Multi-chain NFT Marketplace
                </p>
              </h1>
            </div>
          </div>
        </div>
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-auto hidden lg:block">
              <ul className="flex items-center mr-10">
                <li className="mr-9 text-white hover:text-gray-200 text-lg">
                  <a href="#">Shop</a>
                </li>
                <li className="mr-9 text-white hover:text-gray-200 text-lg">
                  <a href="#">Create</a>
                </li>
                <li className="mr-9 text-white hover:text-gray-200 text-lg">
                  <a href="#">Profile</a>
                </li>
              </ul>
            </div>
            <div className="w-auto lg:block">
              <button className="inline-block font-heading py-3 px-6 leading-none text-white text-md bg-indigo-600 hover:bg-indigo-600 rounded shadow">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
