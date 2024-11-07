import React from 'react';
import Head from 'next/head';

const FaucetCard = ({ link }) => (
  <a href={link.url} className="block no-underline hover:no-underline" target="_blank" rel="noopener noreferrer">
    <div className="shadow-lg mb-4 rounded-3xl overflow-hidden" style={{ backgroundColor: '#2c2f58' }}>
      <div className="flex items-center">
        {/* Text column */}
        <div className="flex-grow px-6 py-4">
          <h3 className="text-xl font-semibold mb-2" style={{ color: '#818394' }}>{link.title}</h3>
          {link.description && (
            <p className="text-gray-400 text-sm">{link.description}</p>
          )}
        </div>
        {/* Button column */}
        <div className="p-4 flex-shrink-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            Get Token
          </button>
        </div>
      </div>
    </div>
  </a>
);

const Faucet = () => {
  const links = [
    { title: 'Alchemy', description: 'Ethereum, Base, OP and many more faucets', url: 'https://faucets.alchemy.com/faucets/ethereum-sepolia' },
    { title: 'Infura', description: 'Sepolia Faucet', url: 'https://www.infura.io/faucet/sepolia' },
    { title: 'Sepolia PoW', description: 'PoW Faucet', url: 'https://sepolia-faucet.pk910.de/' },
    { title: 'GoogleCloud Sepolia', description: '', url: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia' },
    { title: 'Chainlink Faucets', description: 'Chainlink Faucets for many chains and token', url: 'https://faucets.chain.link/sepolia' },
    { title: 'GetBlock', description: 'many different faucets', url: 'https://getblock.io/faucet/eth-sepolia/' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>Faucets</title>
        <meta content="Testnet Faucets" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Testnet Faucets 🚰</h1>
          <p className="text-xl text-gray-600">Get Sepolia Testnet tokens for development</p>
        </div>

        {/* Navigation Buttons
        <div className="flex space-x-4 mb-8 justify-center">
          <a href="#ethereum" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Ethereum</a>
          <a href="#optimism" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Optimism</a>
          <a href="#base" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Base</a>
        </div> */}

        {/* Faucet Cards */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <FaucetCard key={index} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faucet;