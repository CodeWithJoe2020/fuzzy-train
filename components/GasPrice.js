import React, { useState, useEffect } from 'react';
import { createPublicClient, http, formatGwei } from 'viem';
import { mainnet } from 'viem/chains';

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const GasPriceComponent = () => {
  const [gasPrice, setGasPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        const [baseFee, priorityFee] = await Promise.all([
          client.getBlock({ blockTag: 'latest' }).then(block => block.baseFeePerGas),
          client.estimateFeesPerGas().then(fees => fees.maxPriorityFeePerGas),
        ]);

        const totalFee = baseFee + priorityFee;
        const totalFeeGwei = parseFloat(formatGwei(totalFee));
        setGasPrice(totalFeeGwei.toFixed(4));
        setError(null);
      } catch (err) {
        console.error('Error fetching gas price:', err);
        setError(err.message);
      }
    };

    fetchGasPrice();
    const interval = setInterval(fetchGasPrice, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (error) return <div>Error fetching gas price: {error}</div>;
  if (!gasPrice) return <div>⌛️</div>;

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
      <span style={{ marginRight: '10px' }}>⛽️ Gas Price:</span>
      <strong>{gasPrice} Gwei</strong>
    </div>
  );
};

export default GasPriceComponent;
