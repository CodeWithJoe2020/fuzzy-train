import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import Head from 'next/head';
import Balance from '../components/balance';
import EtherscanAPI from '../components/Etherscan';
import TokenBalances from '../components/Erc20balances';
import SendEth from '../components/SendEth';
import Login from '../components/Login';
import SendToken from '../components/sendToken';
import axios from 'axios';

const WalletDashboard = () => {
  const { isConnected } = useAccount();
  const [isHydrated, setIsHydrated] = useState(false);
  const [ethereumPrice, setEthereumPrice] = useState(null);

  useEffect(() => {
    const fetchEthereumPrice = async () => {
      const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
      try {
        const response = await axios.get(apiUrl);
        const price = response.data.ethereum.usd;
        setEthereumPrice(price);
      } catch (error) {
        console.error('Error fetching Ethereum price:', error);
      }
    };

    fetchEthereumPrice();

    // Set up a periodic refresh (every 180 seconds in this example)
    const interval = setInterval(() => {
      fetchEthereumPrice();
    }, 180000); // 180,000 milliseconds = 180 seconds

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; // or a loading spinner
  }

  if (!isConnected) {
    return <Login />;
  }

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
        <Head>
        <title>Wallet | Dashboard</title>
        <meta content="Dashboard" name="Dashboard for ERC20 wallet" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#00ff00'
      }}>Dashboard</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'  // Added space between top 4 cards and other sections
      }}>
        <DashboardCard title="Ethereum Price">
          <p>{ethereumPrice !== null ? `Price: $${ethereumPrice}` : 'Loading...'}</p>
        </DashboardCard>
        
        <DashboardCard title="Your Balance">
          <Balance ethereumPrice={ethereumPrice} />
        </DashboardCard>
        
        <DashboardCard title="Send ETH">
          <SendEth />
        </DashboardCard>
        
        <DashboardCard title="Send Token">
          <SendToken />
        </DashboardCard>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem',
      }}>
        <DashboardCard title="Transactions" fullWidth>
          <EtherscanAPI />
        </DashboardCard>

        <DashboardCard title="Token Balances" fullWidth>
          <TokenBalances />
        </DashboardCard>

      </div>
    </div>
  );
};

const DashboardCard = ({ title, children, fullWidth }) => (
  <div style={{
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    padding: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    gridColumn: fullWidth ? '1 / -1' : 'auto'
  }}>
    <h2 style={{
      fontSize: '1.2rem',
      marginBottom: '1rem',
      color: '#00ff00'
    }}>{title}</h2>
    {children}
  </div>
);

export default WalletDashboard;
