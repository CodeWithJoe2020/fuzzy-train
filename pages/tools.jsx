import React from 'react';
import Head from 'next/head';
import WalletGenerator from '../components/Privatekey';
import EthereumConverter from '../components/converter';
import EthereumGasPrice from '../components/GasPrice';
import CoinGeckoPrice from '../components/EthPrice';

const Tools = () => {
  return (
    <div className="container py-4">
       <Head>
        <title>Tools</title>
        <meta content="tools" name="Ethereum Tools" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {/* EthPrice and GasPrice on one line and centered */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-5 d-flex justify-content-center mb-2 mb-md-0">
          <CoinGeckoPrice />
        </div>
        <div className="col-md-5 d-flex justify-content-center">
          <EthereumGasPrice />
        </div>
      </div>

      {/* WalletGenerator Component */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <WalletGenerator />
        </div>
      </div>

      {/* EthereumConverter Component */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <EthereumConverter />
        </div>
      </div>
    </div>
  );
};

export default Tools;
