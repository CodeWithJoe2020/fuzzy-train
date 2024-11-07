// DexSelector.jsx
import { useState } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';

// Router addresses for different DEXes
export const DEX_ROUTERS = {
  uniswap: {
    ethereum: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    base: '0x2626664c2603336E57B271c5C0b26F421741e481',
    bnb: '0x10ED43C718714eb63d5aA57B78B54704E256024E'
  },
  pancakeswap: {
    ethereum: '0xEfF92A263d31888d860bD50809A8D171709b7b1c',
    base: '0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86',
    bnb: '0x10ED43C718714eb63d5aA57B78B54704E256024E'
  },
  sushiswap: {
    ethereum: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
    base: '0x0BE808376Ecb75a5CF9bB6D237d16cd37893d904',
    bnb: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
  }
};

// Router ABI for adding liquidity
export const ROUTER_ABI = [
  {
    inputs: [
      { internalType: "address", name: "tokenA", type: "address" },
      { internalType: "address", name: "tokenB", type: "address" },
      { internalType: "uint256", name: "amountADesired", type: "uint256" },
      { internalType: "uint256", name: "amountBDesired", type: "uint256" },
      { internalType: "uint256", name: "amountAMin", type: "uint256" },
      { internalType: "uint256", name: "amountBMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "deadline", type: "uint256" }
    ],
    name: "addLiquidity",
    outputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
      { internalType: "uint256", name: "liquidity", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

const DexSelector = ({ tokenAddress, chainId }) => {
  const [selectedDex, setSelectedDex] = useState('');
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState('');

  const getChainName = (chainId) => {
    switch (chainId) {
      case 1: return 'ethereum';
      case 8453: return 'base';
      case 56: return 'bnb';
      default: return 'ethereum';
    }
  };

  const getRouterAddress = () => {
    const chainName = getChainName(chainId);
    return DEX_ROUTERS[selectedDex]?.[chainName];
  };

  const { write: addLiquidity, data: liquidityData } = useContractWrite({
    address: getRouterAddress(),
    abi: ROUTER_ABI,
    functionName: 'addLiquidity',
  });

  const { isLoading: isAddingLiquidity } = useWaitForTransaction({
    hash: liquidityData?.hash,
    onSuccess: (data) => {
      setTxHash(data.transactionHash);
    },
  });

  const handleAddLiquidity = async () => {
    if (!selectedDex) {
      setError('Please select a DEX first');
      return;
    }

    setError('');
    setTxHash('');

    try {
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
      const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

      await addLiquidity({
        args: [
          tokenAddress,
          WETH_ADDRESS,
          parseEther('1000'),
          parseEther('1'),
          parseEther('950'),
          parseEther('0.95'),
          tokenAddress,
          BigInt(deadline)
        ],
      });
    } catch (err) {
      console.error('Error adding liquidity:', err);
      setError('Failed to add liquidity. Please try again.');
    }
  };

  return (
    <div className="dex-selector">
      <h3>Add Token to DEX</h3>
      
      <div className="form-group">
        <label htmlFor="dex">Select DEX</label>
        <select
          id="dex"
          value={selectedDex}
          onChange={(e) => setSelectedDex(e.target.value)}
          className="select-input"
        >
          <option value="">Choose a DEX</option>
          <option value="uniswap">Uniswap</option>
          <option value="pancakeswap">PancakeSwap</option>
          <option value="sushiswap">SushiSwap</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        onClick={handleAddLiquidity}
        disabled={!selectedDex || isAddingLiquidity}
        className="add-liquidity-button"
      >
        {isAddingLiquidity ? "Adding to DEX..." : "Add to DEX"}
      </button>

      {txHash && (
        <div className="success-message">
          Token successfully added to {selectedDex}!
          <br />
          Transaction Hash:
          <a 
            href={`https://etherscan.io/tx/${txHash}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {txHash}
          </a>
        </div>
      )}

      <style jsx>{`
        .dex-selector {
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          max-width: 600px;
          margin: 20px auto;
        }

        h3 {
          text-align: center;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .select-input {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .add-liquidity-button {
          width: 100%;
          padding: 10px;
          background-color: #28a745;
          color: white;
          font-size: 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .add-liquidity-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .error-message {
          color: #dc3545;
          margin-bottom: 15px;
          text-align: center;
        }

        .success-message {
          color: #28a745;
          margin-top: 15px;
          text-align: center;
          word-break: break-all;
        }
      `}</style>
    </div>
  );
};

export default DexSelector;