import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Alchemy, Network } from 'alchemy-sdk';

const config = {
  apiKey: "29USglT6--Tu0U0Oyc8_71PWfMxoDnvh", // Use environment variable for API key
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

function TokenBalances() {
  const [balances, setBalances] = useState([]);
  const [error, setError] = useState(null);
  const { address } = useAccount();

  useEffect(() => {
    const fetchTokenBalances = async () => {
      if (!address) {
        setError('Please provide an Ethereum address.');
        return;
      }

      try {
        // Get token balances
        const { tokenBalances } = await alchemy.core.getTokenBalances(address);

        if (!tokenBalances || tokenBalances.length === 0) {
          setError('No token balances found for this address.');
          return;
        }

        // Filter out tokens with zero balance
        const nonZeroBalances = tokenBalances.filter(token => parseFloat(token.tokenBalance) > 0);

        // Fetch metadata for all tokens in parallel
        const metadataPromises = nonZeroBalances.map(token =>
          alchemy.core.getTokenMetadata(token.contractAddress)
        );

        const metadataResponses = await Promise.all(metadataPromises);

        // Format balances with metadata
        const formattedBalances = nonZeroBalances.map((token, index) => {
          const metadata = metadataResponses[index];
          const balance = parseFloat(token.tokenBalance) / Math.pow(10, metadata.decimals);
          return {
            name: metadata.name,
            balance: balance.toFixed(2),
            symbol: metadata.symbol,
          };
        });

        setBalances(formattedBalances);
      } catch (err) {
        setError('An error occurred while fetching token balances.');
        console.error('Error fetching token balances:', err);
      }
    };

    fetchTokenBalances();
  }, [address]);

  return (
    <div>
      <h2>Token Balances</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {balances.length > 0 ? (
          balances.map((token, index) => (
            <li key={index}>
              <strong>Name:</strong> {token.name} <br />
              <strong>Balance:</strong> {token.balance} <br />
              <strong>Symbol:</strong> {token.symbol} <br />
              <hr />
            </li>
          ))
        ) : (
          <p>No tokens found.</p>
        )}
      </ul>
    </div>
  );
}

export default TokenBalances;
