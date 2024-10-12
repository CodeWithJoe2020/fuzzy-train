import axios from 'axios';
import { useEffect, useState } from 'react';

const CoinGeckoPrice = () => {
  const [ethereumPrice, setEthereumPrice] = useState(null);

  const fetchData = () => {
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
    axios
      .get(apiUrl)
      .then((response) => {
        const price = response.data.ethereum.usd;
        setEthereumPrice(price);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up a periodic refresh (every 60 seconds in this example)
    const interval = setInterval(() => {
      fetchData();
    }, 180000); // 180,000 milliseconds = 180 seconds

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
      <span style={{ marginRight: '10px' }}>🌐 Ethereum Price:</span>
      <strong>${ethereumPrice !== null ? ethereumPrice : 'Loading...'}</strong>
    </div>
  );
};

export default CoinGeckoPrice;
