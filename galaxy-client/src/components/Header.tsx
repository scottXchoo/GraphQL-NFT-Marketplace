import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <section className="overflow-hidden">
      <div className="flex items-center justify-between px-8 py-4 bg-gray-900">
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <Image
              width={40}
              height={40}
              src="/galaxyLogo.png"
              alt=""
              className="rounded shadow-md mr-3"
            />
            <div className="w-auto mr-14 flex">
              <h1 className="text-3xl leading-tight font-heading text-white">
                Galaxy
              </h1>
            </div>
          </div>
        </div>
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-auto hidden lg:block">
              <ul className="flex items-center mr-10">
                <li className="font-heading mr-9 text-white hover:text-gray-200 text-lg">
                  <a href="#">Shopping</a>
                </li>
                <li className="font-heading mr-9 text-white hover:text-gray-200 text-lg">
                  <a href="#">Create</a>
                </li>
                <li className="font-heading mr-9 text-white hover:text-gray-200 text-lg">
                  <a href="#">Profile</a>
                </li>
              </ul>
            </div>
            <div className="w-auto lg:block">
              <button className="inline-block font-heading py-3 px-6 leading-none text-white text-md bg-indigo-600 hover:bg-indigo-600 rounded shadow">
                Connect Wallet
              </button>
            </div>
            <div className="w-auto lg:hidden">
              <a href="#">
                <svg
                  className="navbar-burger text-gray-800"
                  width="51"
                  height="51"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="56"
                    height="56"
                    rx="28"
                    fill="currentColor"
                  ></rect>
                  <path
                    d="M37 32H19M37 24H19"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
