import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product }) => (
  <Link href={product.signup} className="block no-underline hover:no-underline" target="_blank" rel="noopener noreferrer">
    <div className="shadow-lg mb-4 rounded-3xl overflow-hidden" style={{ backgroundColor: '#2c2f58' }}>
      <div className="flex items-center">
        {/* Image column */}
        <div className="w-24 h-24 p-3 flex-shrink-0">
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
              sizes="(max-width: 768px) 96px, 96px"
            />
          </div>
        </div>
        {/* Text column */}
        <div className="flex-grow px-4">
          <div className="py-3">
            <h3 className="text-xl font-semibold mb-2" style={{ color: '#818394' }}>{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>
        </div>
        {/* Button column */}
        <div className="p-4 flex-shrink-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            Sign up
          </button>
        </div>
      </div>
    </div>
  </Link>
);

const ProductSection = ({ id, title, products }) => (
  <section id={id} className="mb-12">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
    <div className="space-y-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  </section>
);

const CryptoProducts = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Head>
        <title>Crypto Products</title>
        <meta content="crypto credit cards" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      
      <div className="container mx-auto px-4">
        {/* Navigation Buttons */}
        <div className="flex space-x-4 mb-8 justify-center">
          <a href="#dex" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Decentralized Exchanges</a>
          <a href="#trading" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Trading Platforms</a>
          <a href="#creditCards" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Crypto Credit Cards</a>
          <a href="#gold" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Buy Gold & Stocks</a>
          <a href="#nodes" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">Nodes</a>
        </div>

        {/* Product Sections */}
        <ProductSection id="dex" title="Decentralized Exchanges" products={products.dex} />
        <ProductSection id="trading" title="Trading Platforms" products={products.trading} />
        <ProductSection id="creditCards" title="Crypto Credit Cards" products={products.creditCards} />
        <ProductSection id="gold" title="Buy Gold & Stocks" products={products.gold} />
        <ProductSection id="gold" title="Blockchain Nodes" products={products.nodes} />
      </div>
    </div>
  );
};

// Products data structure remains the same
const products = {
    creditCards: [
      {
        name: 'Bitpanda Card',
        image: '/bitpandacreditcard.png',
        signup: 'https://www.bitpanda.com/?ref=3518062445954730230',
        description: "Use the Bitpanda App to switch between payment assets. Accepted by 54m+ Visa merchants in 200+ countries."
      },
      {
        name: 'Crypto.com',
        image: '/crypto-com.png',
        signup: 'https://www.crypto.com',
        description: "Crypto.com Credit card - get it now!"
      },
      {
        name: 'Bybit Card',
        image: '/bybitcard.png',
        signup: 'https://partner.bybit.com/b/4220',
        description: "Bybit credit card - versatile and crypto-friendly."
      },
      {
        name: 'MetaMask Card',
        image: '/MetaMask_Fox.svg.png',
        signup: 'https://metamask.io/news/latest/introducing-metamask-card-upgrade-your-crypto-spending/',
        description: "Metamask Debit Card, available in the EU and UK"
      },
    ],
    gold: [
      {
        name: "Bitpanda Gold & Metals",
        image: "/bitpanda-metal.png",
        signup: "https://www.bitpanda.com/?ref=3518062445954730230",
        description: "Buy Gold, silver, platinum and other precious metals as well as stocks and crypto."
      }
    ],
    trading: [
      {
        name: "Bybit",
        image: "/Bybit.png",
        signup: "https://partner.bybit.com/b/8MHTG12R4220",
        description: "Stand to earn the biggest reward in any crypto exchange!"
      },
      {
        name: "Binance",
        image: "/binancelogo-round.png",
        signup: "https://accounts.binance.com/register?ref=G4ZIQUTM",
        description: "Earn free crypto through learning. Build your blockchain knowledge."
      },
      {
        name: "Atani Exchange",
        image: "/atani.png",
        signup: "https://app.atani.com/#/signup/?r=MX0VIJO",
        description: "Atani Exchange - Your gateway to diverse crypto trading options."
      },
      {
        name: "Phemex",
        image: "/phemexlogo.png",
        signup: "https://bit.ly/3BURI8r",
        description: "The most efficient crypto trading platform. Buy, Sell & Earn Bitcoin."
      },
      {
        name: "Okx",
        image: "/okx-logo-black-and-white.jpg",
        signup: "https://bit.ly/3IEsrzM",
        description: "Top-five cryptocurrency exchange with support for many coins."
      },
      {
        name: "BitGet",
        image: "/bitget.png",
        signup: "https://bonus.bitget.com/R3G5FK",
        description: "Bitget - Get access to the Spot and Futures market."
      },
      {
        name: "Gate.io",
        image: "/gateio.png",
        signup: "https://www.gate.io/ref/AVYQBW1W?ref_type=102",
        description: "Sign-up take less than 40 seconds. Gate io Leading trading platform that makes your easy profits with copying from experts"
      },
    ],
    dex:[
      {
        name: "Uniswap",
        image: "/uniswap-uni-logo.png",
        signup: "https://app.uniswap.org/",
        description: "Uniswap, largest Dex by Volume"
      },
      {
        name: "PancakeSwap",
        image: "/pancakeswap-cake-logo.png",
        signup: "https://pancakeswap.finance/",
        description: "PancakeSwap, Largest Dex on BSC"
      },
      {
        name: "1Inch Swap",
        image: "/1inch.png",
        signup: "https://app.1inch.io/",
        description: "1Inch"
      },
      {
        name: "SushiSwap",
        image: "/sushiswap-sushi-logo.png",
        signup: "https://www.sushi.com/",
        description: "SushiSwap"
      },
    ],
    nodes:[
      {
        name: "Alchemy Nodes",
        image: "/alchemy.svg",
        signup: "https://www.alchemy.com/",
        description: "Nodes for every blockhaina nd evm"
      },
      {
        name: "Quicknode",
        image: "/quicknode.png",
        signup: "https://refer.quicknode.com/?via=cwj",
        description: "Nodes for every blockhaina nd evm"
      },
    ]
  };

export default CryptoProducts;
