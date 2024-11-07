import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Alchemy, Network } from 'alchemy-sdk';

// Configure Alchemy
const config = {
  apiKey: "29USglT6--Tu0U0Oyc8_71PWfMxoDnvh",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);

function TokenBalances() {
  const [balances, setBalances] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchTokenBalances = async () => {
      if (!address || !isConnected) {
        setError('Please connect your wallet to view token balances.');
        setBalances([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get token balances
        const balancesData = await alchemy.core.getTokenBalances(address);
        
        if (!balancesData.tokenBalances || balancesData.tokenBalances.length === 0) {
          setBalances([]);
          setLoading(false);
          return;
        }

        // Filter out tokens with zero balance
        const nonZeroBalances = balancesData.tokenBalances.filter(
          token => token.tokenBalance && BigInt(token.tokenBalance) > BigInt(0)
        );

        // Fetch metadata for each token
        const formattedBalances = await Promise.all(
          nonZeroBalances.map(async (token) => {
            try {
              const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
              
              if (!metadata || !metadata.decimals) {
                return null;
              }

              const balance = Number(BigInt(token.tokenBalance)) / Math.pow(10, metadata.decimals);
              
              return {
                name: metadata.name || 'Unknown Token',
                symbol: metadata.symbol || '???',
                balance: balance.toFixed(4),
                decimals: metadata.decimals,
                logo: metadata.logo || null,
                contractAddress: token.contractAddress,
              };
            } catch (err) {
              console.error(`Error fetching metadata for token ${token.contractAddress}:`, err);
              return null;
            }
          })
        );

        // Filter out null values and sort by balance
        const validBalances = formattedBalances
          .filter(Boolean)
          .sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));

        setBalances(validBalances);
      } catch (err) {
        console.error('Error fetching token balances:', err);
        setError('Failed to fetch token balances. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTokenBalances();
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Please connect your wallet to view token balances.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Token Balances</h2>
      
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading token balances...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && balances.length === 0 && !error && (
        <div className="text-center py-8">
          <p className="text-gray-600">No tokens found for this address.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {balances.map((token, index) => (
          <div 
            key={token.contractAddress} 
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {token.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {token.symbol}
                </p>
              </div>
              {token.logo && (
                <img 
                  src={token.logo} 
                  alt={`${token.symbol} logo`} 
                  className="w-8 h-8 rounded-full"
                  onError={(e) => e.target.style.display = 'none'}
                />
              )}
            </div>
            
            <div className="mt-2">
              <p className="text-lg font-medium text-gray-900">
                {token.balance} {token.symbol}
              </p>
              <a 
                href={`https://etherscan.io/token/${token.contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
              >
                View on Etherscan
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TokenBalances;