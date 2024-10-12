import React, { useState } from "react";
import Link from 'next/link';
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import 'bootstrap/dist/css/bootstrap.css';

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width="50"
              height="50"
            />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!collapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse ${collapsed ? "collapse" : ""}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link href="/wallet" className="nav-link text-white">Wallet</Link>
            </li>
            {/* <li className="nav-item">
              <Link href="/games" className="nav-link text-white">Game</Link>
            </li> */}
           
            <li className="nav-item">
              <Link href="/creditcards" className="nav-link text-white">CryptoCards</Link>
            </li>
            <li className="nav-item">
              <Link href="/tools" className="nav-link text-white">Tools</Link>
            </li>
            <li className="nav-item">
              <Link href="/faucets" className="nav-link text-white">Faucets</Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className="nav-link text-white">Contact</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <ConnectButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
