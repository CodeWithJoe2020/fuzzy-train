import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const toggleToolsDropdown = () => {
    setToolsDropdownOpen(!toolsDropdownOpen);
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width="40"
              height="40"
              className="mr-2"
            />
          </Link>
        </div>
        {/* <h1>test</h1> */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        <div
          className={`${
            collapsed ? "hidden" : ""
          } w-full md:flex md:items-center md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0">
            <li>
              <Link href="/wallet" className="nav-link text-white hover:text-gray-300 px-2 py-1 text-sm rounded-md">
                Wallet
              </Link>
            </li>
            <li>
              <Link href="/stake" className="nav-link text-white hover:text-gray-300 px-2 py-1 text-sm rounded-md">
                Stake
              </Link>
            </li>
            <li>
              <Link href="/mixer" className="nav-link text-white hover:text-gray-300 px-2 py-1 text-sm rounded-md">
                Mixer
              </Link>
            </li>
            <li>
              <Link href="/creditcards" className="nav-link text-white hover:text-gray-300 px-2 py-1 text-sm rounded-md">
                Links
              </Link>
            </li>
            <li className="relative group">
              <div className="flex items-center">
                <Link href="/tools" className="nav-link text-white hover:text-gray-300 px-2 py-1 text-sm rounded-md">
                  Tools
                </Link>
                <button
                  onClick={toggleToolsDropdown}
                  className="ml-1 focus:outline-none"
                  aria-label="Toggle tools menu"
                >
                  <svg
                    className={`w-3 h-3 transform ${toolsDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              {toolsDropdownOpen && (
                <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                  <Link
                      href="/createtoken"
                      className="block px-4 py-1 text-sm text-gray-100 hover:bg-gray-700"
                      role="menuitem"
                    >
                      Create Token
                    </Link>
                    <Link
                      href="/faucets"
                      className="block px-4 py-1 text-sm text-gray-100 hover:bg-gray-700"
                      role="menuitem"
                    >
                      Faucets
                    </Link>
                   
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link href="/contact" className="nav-link text-white hover:text-gray-300 px-2 py-1 text-sm rounded-md">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="hidden md:flex">
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;