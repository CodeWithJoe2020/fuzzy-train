




import React, { useState, useEffect } from 'react';
// Import wagmi functions if needed
import { fetchToken } from '@wagmi/core'
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';
import { parseEther } from 'ethers';

function Token() {
    const [address, setAddress] = useState('');
    const [tokenData, setTokenData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    // Custom replacer function to handle BigInt
    const replacer = (key, value) =>
      typeof value === 'bigint' ? value.toString() : value;
  
    async function fetchTokenData(userAddress) {
      setIsLoading(true);
      try {
        const tokenData = await fetchToken({
          address: userAddress,
          formatUnits: 'gwei',
        });
        setTokenData(Array.isArray(tokenData) ? tokenData : [tokenData]);
      } catch (error) {
        console.error('Error fetching token data:', error);
        setTokenData([]);
      } finally {
        setIsLoading(false);
      }
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      fetchTokenData(address);
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
          />
          <button type="submit">Fetch Token Data</button>
        </form>
  
        {isLoading && <div>Loading token data...</div>}
  
        {!isLoading && tokenData.length > 0 && (
          <div>
            <h2>Token Data:</h2>
            <ul>
              {tokenData.map((token, index) => (
                <li key={index}>
                  {JSON.stringify(token, replacer)}
                </li>
              ))}
            </ul>
          </div>
        )}
  
        {!isLoading && !tokenData.length && (
          <div>No token data or invalid address.</div>
        )}
      </div>
    );
  }
  
  export default Token;
