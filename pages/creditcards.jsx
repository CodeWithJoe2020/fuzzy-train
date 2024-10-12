import React from 'react';
import Link from 'next/link';

const products = {
  creditCards: [
    {
      name: 'Bitpanda Card',
      image: '/bitpandacreditcard.png',
      signup: 'https://www.bitpanda.com/?ref=3518062445954730230',
      description: "Use the Bitpanda App to switch between payment assets. Accepted by 54m+ Visa merchants in 200+ countries. No card fees, no monthly account fees."
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
      image: "/bybit30k.png",
      signup: "https://partner.bybit.com/b/8MHTG12R4220",
      description: "Stand to earn the biggest reward in any crypto exchange! Bybit is offering up to 30,000 USDT in deposit rewards!"
    },
    {
      name: "Binance",
      image: "/binance.png",
      signup: "https://accounts.binance.com/register?ref=G4ZIQUTM",
      description: "Earn free crypto through learning. Build your blockchain knowledge, complete quizzes, and earn free crypto."
    },
    {
      name: "Atani Exchange",
      image: "/atani.png",
      signup: "https://app.atani.com/#/signup/?r=MX0VIJO",
      description: "Atani Exchange - Your gateway to diverse crypto trading options."
    }
  ]
};

const ProductCard = ({ product }) => (
  <div className="card h-100 shadow-sm">
    <img
      src={product.image}
      alt={product.name}
      className="card-img-top"
      style={{ height: '200px', objectFit: 'contain', padding: '1rem' }}
    />
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text flex-grow-1">{product.description}</p>
      <Link href={product.signup} className="btn btn-primary mt-auto">
        Sign up
      </Link>
    </div>
  </div>
);

const ProductSection = ({ title, products }) => (
  <div className="mb-5">
    <h2 className="mb-4">{title}</h2>
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {products.map((product, index) => (
        <div key={index} className="col">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  </div>
);

const CryptoProducts = () => {
  return (
    <div className="container py-5">
      <ProductSection title="Crypto Credit Cards" products={products.creditCards} />
      <ProductSection title="Buy Gold & Precious Metals" products={products.gold} />
      <ProductSection title="Trading Platforms" products={products.trading} />
    </div>
  );
};

export default CryptoProducts;