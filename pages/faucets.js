import React from 'react';
import Link from 'next/link';
import styles from '../styles/Faucets.module.css';

const Faucet = () => {
  const links = [
    { title: 'Alchemy', description: 'Ethereum, Base, OP and many more faucets', url: 'https://faucets.alchemy.com/faucets/ethereum-sepolia' },
    { title: 'Infura', description: 'Sepolia Faucet', url: 'https://www.infura.io/faucet/sepolia' },
    { title: 'Sepolia PoW ', description: 'PoW Faucet', url: 'https://sepolia-faucet.pk910.de/' },
    { title: 'GoogleCloud Sepolia', description: '', url: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia' },
    { title: 'Chainlink Faucets', description: 'Chainlink Faucets for many chains and token', url: 'https://faucets.chain.link/sepolia' },
    { title: 'GetBlock', description: 'many different faucets', url: 'https://getblock.io/faucet/eth-sepolia/' }
  ];

  return (
    <div>
      {/* Jumbotron Section */}
      <div className={`jumbotron bg-dark text-white p-5 rounded ${styles.jumbotron}`}>
        <div className="container">
        <h1 className="display-4">Testnet Faucets</h1>
        <p className="lead">get Sepolia Testnet token for developing</p>
        </div>
      </div>

      {/* Links Section */}
      <div className="container mt-5">
        {links.map((link, index) => (
          <div key={index} className={`card mb-3 shadow-sm ${styles.card}`}>
            <div className="card-body">
              <h5 className="card-title">
                {link.title}
              </h5>
              {link.description && <p className="card-text">{link.description}</p>}
              <Link href={link.url} className="card-link text-primary">
                getToken &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faucet;
